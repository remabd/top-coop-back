import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  Utilisateur,
  Prisma,
  Participation,
  Panier,
} from '../generated/prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../auth/auth.guard';
import { verifieAppartenance } from '../auth/appartenance';
import { HEURE_EN_MS, QUOTA_MENSUEL_HEURE } from '../CONST';
import {
  UtilisateurAvecParticipations,
  UtilisateurAvecQuota,
} from './dto/utilisateur.type';

@Injectable()
export class UtilisateurService {
  private SALT = 10;
  constructor(private prisma: PrismaService) {}

  async utilisateur(
    utilisateurWhereUniqueInput: Prisma.UtilisateurWhereUniqueInput,
  ): Promise<Utilisateur> {
    return this.prisma.utilisateur.findUniqueOrThrow({
      where: utilisateurWhereUniqueInput,
    });
  }

  async utilisateurs(): Promise<Utilisateur[]> {
    return this.prisma.utilisateur.findMany();
  }

  async cree(data: Prisma.UtilisateurCreateInput): Promise<Utilisateur> {
    data.motDePasse = await bcrypt.hash(data.motDePasse, this.SALT);
    return this.prisma.utilisateur.create({ data });
  }

  async modifie(params: {
    where: Prisma.UtilisateurWhereUniqueInput;
    data: Prisma.UtilisateurUpdateInput;
  }): Promise<Utilisateur> {
    const { where, data } = params;
    if (data.motDePasse) {
      const mdp = data.motDePasse as string;
      data.motDePasse = await bcrypt.hash(mdp, this.SALT);
    }
    return this.prisma.utilisateur.update({
      data,
      where,
    });
  }

  async supprime(
    where: Prisma.UtilisateurWhereUniqueInput,
  ): Promise<Utilisateur> {
    return this.prisma.utilisateur.delete({
      where,
    });
  }

  async voirParticipations(
    id: string,
    utilisateur: JwtPayload | undefined,
  ): Promise<Participation[]> {
    verifieAppartenance(id, utilisateur);
    return this.prisma.participation.findMany({ where: { utilisateurId: id } });
  }

  async voirPaniers(
    id: string,
    utilisateur: JwtPayload | undefined,
  ): Promise<Panier[]> {
    verifieAppartenance(id, utilisateur);
    return this.prisma.panier.findMany({ where: { utilisateurId: id } });
  }

  async voirInfos(
    id: string,
    utilisateur: JwtPayload | undefined,
  ): Promise<Utilisateur> {
    verifieAppartenance(id, utilisateur);
    return this.prisma.utilisateur.findUniqueOrThrow({ where: { id } });
  }

  async utilisateursAvecQuota(): Promise<UtilisateurAvecQuota[]> {
    const utilisateurs = await this.prisma.utilisateur.findMany({
      include: {
        participations: {
          include: { creneau: true },
        },
      },
    });
    return utilisateurs.map((u) => this.calculeQuota(u));
  }

  private calculeQuota(
    utilisateur: UtilisateurAvecParticipations,
  ): UtilisateurAvecQuota {
    const [debut, fin] = this.bornesDuMois(new Date());
    const heuresFaites = utilisateur.participations
      .filter((p) => p.creneau.dateDebut >= debut && p.creneau.dateDebut < fin)
      .reduce(
        (acc, p) =>
          acc +
          this.calculeDureeEnHeure(p.creneau.dateDebut, p.creneau.dateFin),
        0,
      );
    return { ...utilisateur, quota: QUOTA_MENSUEL_HEURE - heuresFaites };
  }

  private bornesDuMois(date: Date): [Date, Date] {
    const debut = new Date(date.getFullYear(), date.getMonth(), 1);
    const fin = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    return [debut, fin];
  }

  private calculeDureeEnHeure(dateDebut: Date, dateFin: Date): number {
    return (dateFin.getTime() - dateDebut.getTime()) / HEURE_EN_MS;
  }
}
