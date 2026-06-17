import { Injectable } from '@nestjs/common';
import { Commande_Produit, Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateCommandeProduitDto } from './dto/create-commande-produit.dto';
import { UpdateCommandeProduitDto } from './dto/update-commande-produit.dto';

@Injectable()
export class CommandeProduitService {
  constructor(private prisma: PrismaService) {}

  cree(data: CreateCommandeProduitDto): Promise<Commande_Produit> {
    return this.prisma.$transaction(async (tx) => {
      const commandeProduit = await tx.commande_Produit.create({
        data: {
          quantite: data.quantite,
          commande: { connect: { id: data.commandeId } },
          typeProduit: { connect: { id: data.typeProduitId } },
        },
      });

      await tx.produit.create({
        data: {
          quantite: data.quantite,
          dateArrive: new Date(),
          typeProduit: { connect: { id: data.typeProduitId } },
        },
      });

      return commandeProduit;
    });
  }

  commandeProduits(): Promise<Commande_Produit[]> {
    return this.prisma.commande_Produit.findMany();
  }

  commandeProduit(
    where: Prisma.Commande_ProduitWhereUniqueInput,
  ): Promise<Commande_Produit> {
    return this.prisma.commande_Produit.findUniqueOrThrow({ where });
  }

  modifie(params: {
    where: Prisma.Commande_ProduitWhereUniqueInput;
    data: UpdateCommandeProduitDto;
  }): Promise<Commande_Produit> {
    const { where, data } = params;
    return this.prisma.commande_Produit.update({
      where,
      data: {
        ...(data.quantite !== undefined && { quantite: data.quantite }),
        ...(data.commandeId && {
          commande: { connect: { id: data.commandeId } },
        }),
        ...(data.typeProduitId && {
          typeProduit: { connect: { id: data.typeProduitId } },
        }),
      },
    });
  }

  supprime(
    where: Prisma.Commande_ProduitWhereUniqueInput,
  ): Promise<Commande_Produit> {
    return this.prisma.commande_Produit.delete({ where });
  }
}
