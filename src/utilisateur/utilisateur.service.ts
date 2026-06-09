import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  Utilisateur,
  Prisma,
  Participation,
  Panier,
} from '../generated/prisma/client';
import * as bcrypt from 'bcrypt';

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
    where: Prisma.UtilisateurWhereUniqueInput,
  ): Promise<Participation[]> {
    const utilisateur = this.prisma.utilisateur.findUniqueOrThrow({ where });
    return utilisateur.participations();
  }

  async voirPaniers(
    where: Prisma.UtilisateurWhereUniqueInput,
  ): Promise<Panier[]> {
    const utilisateur = this.prisma.utilisateur.findUniqueOrThrow({ where });
    return utilisateur.paniers();
  }
}
