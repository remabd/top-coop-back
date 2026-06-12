import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Utilisateur, Prisma, Panier } from '../generated/prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../auth/auth.guard';
import { HEURE_EN_MS, QUOTA_MENSUEL_HEURE } from '../CONST';
import {
  ParticipationAvecCreneauEtCoParticipants,
  UtilisateurAvecParticipations,
  UtilisateurAvecQuota,
  UtilisateurInfos,
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
    utilisateur: JwtPayload | undefined,
  ): Promise<ParticipationAvecCreneauEtCoParticipants[]> {
    if (!utilisateur?.sub) {
      throw new UnauthorizedException();
    }
    return this.prisma.participation.findMany({
      where: { utilisateurId: utilisateur.sub },
      include: {
        creneau: {
          include: {
            participations: {
              select: {
                utilisateur: {
                  select: { id: true, prenom: true, nom: true },
                },
              },
            },
          },
        },
      },
    });
  }

  async voirPaniers(utilisateur: JwtPayload | undefined): Promise<Panier[]> {
    if (!utilisateur?.sub) {
      throw new UnauthorizedException();
    }
    return this.prisma.panier.findMany({
      where: { utilisateurId: utilisateur.sub },
    });
  }

  async voirInfos(
    utilisateur: JwtPayload | undefined,
  ): Promise<UtilisateurInfos> {
    if (!utilisateur?.sub) {
      throw new UnauthorizedException();
    }
    return this.prisma.utilisateur.findUniqueOrThrow({
      where: { id: utilisateur.sub },
      select: { id: true, prenom: true, nom: true, role: true },
    });
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
