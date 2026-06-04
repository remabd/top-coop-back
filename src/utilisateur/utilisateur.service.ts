import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Utilisateur, Prisma } from 'src/generated/prisma/client';
import { UtilisateurWhereUniqueInput } from 'src/generated/prisma/models';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

@Injectable()
export class UtilisateurService {
  private SALT = 10;
  constructor(private prisma: PrismaService) {}

  async utilisateur(
    utilisateurWhereUniqueInput: UtilisateurWhereUniqueInput,
  ): Promise<Utilisateur | null> {
    return this.prisma.utilisateur.findUnique({
      where: utilisateurWhereUniqueInput,
    });
  }

  async utilisateurs(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UtilisateurWhereUniqueInput;
    where?: Prisma.UtilisateurWhereInput;
    orderBy?: Prisma.UtilisateurOrderByWithRelationInput;
  }): Promise<Utilisateur[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.utilisateur.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async creeUtilisateur(
    data: Prisma.UtilisateurCreateInput,
  ): Promise<Utilisateur> {
    const hash = await bcrypt.hash(data.motDePasse, this.SALT);
    data.motDePasse = hash;
    return this.prisma.utilisateur.create({
      data,
    });
  }

  async modifieUtilisateur(params: {
    where: Prisma.UtilisateurWhereUniqueInput;
    data: Prisma.UtilisateurUpdateInput;
  }): Promise<Utilisateur> {
    const { where, data } = params;
    return this.prisma.utilisateur.update({
      data,
      where,
    });
  }

  async supprimeUtilisateur(
    where: Prisma.UtilisateurWhereUniqueInput,
  ): Promise<Utilisateur> {
    return this.prisma.utilisateur.delete({
      where,
    });
  }
}
