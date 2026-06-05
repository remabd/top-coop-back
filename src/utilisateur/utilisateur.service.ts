import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Utilisateur, Prisma } from '../generated/prisma/client';
import { UtilisateurWhereUniqueInput } from 'src/generated/prisma/models';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

@Injectable()
export class UtilisateurService {
  private SALT = 10;
  constructor(private prisma: PrismaService) {}

  async utilisateur(
    utilisateurWhereUniqueInput: UtilisateurWhereUniqueInput,
  ): Promise<Utilisateur> {
    try {
      return await this.prisma.utilisateur.findUniqueOrThrow({
        where: utilisateurWhereUniqueInput,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError)
        if (e.code === 'P2025') {
          throw new NotFoundException();
        }
      throw e;
    }
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
    try {
      const hash = await bcrypt.hash(data.motDePasse, this.SALT);
      data.motDePasse = hash;
      return await this.prisma.utilisateur.create({ data });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') throw new ConflictException();
      }
      throw e;
    }
  }

  async modifieUtilisateur(params: {
    where: Prisma.UtilisateurWhereUniqueInput;
    data: Prisma.UtilisateurUpdateInput;
  }): Promise<Utilisateur> {
    const { where, data } = params;
    try {
      if (data.motDePasse) {
        const mdp = data.motDePasse as string;
        data.motDePasse = await bcrypt.hash(mdp, this.SALT);
      }
      return await this.prisma.utilisateur.update({
        data,
        where,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError)
        if (e.code === 'P2025') {
          throw new NotFoundException();
        }
      throw e;
    }
  }

  async supprimeUtilisateur(
    where: Prisma.UtilisateurWhereUniqueInput,
  ): Promise<Utilisateur> {
    try {
      return await this.prisma.utilisateur.delete({
        where,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError)
        if (e.code === 'P2025') {
          throw new NotFoundException();
        }
      throw e;
    }
  }
}
