import { Injectable } from '@nestjs/common';
import { Commande, Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';

@Injectable()
export class CommandeService {
  constructor(private prisma: PrismaService) {}

  cree(data: CreateCommandeDto): Promise<Commande> {
    return this.prisma.commande.create({
      data: {
        utilisateur: { connect: { id: data.utilisateurId } },
      },
    });
  }

  commandes(): Promise<Commande[]> {
    return this.prisma.commande.findMany();
  }

  commande(
    commandeWhereUniqueInput: Prisma.CommandeWhereUniqueInput,
  ): Promise<Commande> {
    return this.prisma.commande.findUniqueOrThrow({
      where: commandeWhereUniqueInput,
    });
  }

  modifie(params: {
    where: Prisma.CommandeWhereUniqueInput;
    data: UpdateCommandeDto;
  }): Promise<Commande> {
    const { where, data } = params;
    return this.prisma.commande.update({
      where,
      data: {
        ...(data.utilisateurId && {
          utilisateur: { connect: { id: data.utilisateurId } },
        }),
      },
    });
  }

  supprime(where: Prisma.CommandeWhereUniqueInput): Promise<Commande> {
    return this.prisma.commande.delete({ where });
  }
}
