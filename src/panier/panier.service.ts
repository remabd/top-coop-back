import { Injectable, NotFoundException } from '@nestjs/common';
import { Panier, Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma.service';
import {
  CreatePanierDto,
  DtoVersPanierComplet,
  DtoVersPanierUtilisateur,
} from './dto/create-panier.dto';
import { UpdatePanierDto } from './dto/update-panier.dto';
import { JwtPayload } from '../auth/auth.guard';
import { verifieAppartenance } from '../auth/appartenance';

@Injectable()
export class PanierService {
  constructor(private prisma: PrismaService) {}

  cree(data: CreatePanierDto): Promise<Panier> {
    return this.prisma.panier.create({
      data: {
        prix: data.prix,
        utilisateur: { connect: { id: data.utilisateurId } },
      },
    });
  }

  paniers(): Promise<Panier[]> {
    return this.prisma.panier.findMany();
  }

  panier(where: Prisma.PanierWhereUniqueInput): Promise<Panier> {
    return this.prisma.panier.findUniqueOrThrow({ where });
  }

  modifie(params: {
    where: Prisma.PanierWhereUniqueInput;
    data: UpdatePanierDto;
  }): Promise<Panier> {
    const { where, data } = params;
    return this.prisma.panier.update({
      where,
      data: {
        ...(data.prix !== undefined && { prix: data.prix }),
        ...(data.utilisateurId && {
          utilisateur: { connect: { id: data.utilisateurId } },
        }),
      },
    });
  }

  supprime(where: Prisma.PanierWhereUniqueInput): Promise<Panier> {
    return this.prisma.panier.delete({ where });
  }

  creePanierComplet(
    data: DtoVersPanierComplet,
    utilisateur: JwtPayload | undefined,
  ): Promise<Panier> {
    verifieAppartenance(data.utilisateurId, utilisateur);
    return this.prisma.panier.create({
      data: {
        prix: data.prix,
        utilisateur: { connect: { id: data.utilisateurId } },
        produitPaniers: {
          create: data.produits.map((item) => ({
            produit: { connect: { id: item.produitId } },
            quantite: item.quantite,
            unite: item.unite,
            prix: item.prix,
          })),
        },
      },
      include: { produitPaniers: true },
    });
  }

  paniersComplets() {
    return this.prisma.panier.findMany({
      include: {
        produitPaniers: {
          include: { produit: { include: { typeProduit: true } } },
        },
      },
    });
  }

  sauverPanierdUtilisateur(
    data: DtoVersPanierUtilisateur,
    utilisateur: JwtPayload | undefined,
  ) {
    if (!utilisateur?.sub) {
      throw new NotFoundException();
    }
    return this.prisma.$transaction(async (tx) => {
      const panier = await tx.panier.create({
        data: {
          utilisateur: { connect: { id: utilisateur.sub } },
          prix: data.prix,
        },
      });

      for (const ligne of data.produits) {
        const typeProduit = await tx.type_Produit.findUniqueOrThrow({
          where: { id: ligne.typeProduitId },
        });
        let quantiteRestante = ligne.quantite;

        // Une ligne scannée peut consommer plusieurs lots (FIFO)
        while (quantiteRestante > 0) {
          const produit = await tx.produit.findFirstOrThrow({
            where: { typeProduitId: typeProduit.id, dateSortie: null },
            orderBy: { dateArrive: 'asc' },
          });

          const quantiteConsommee = Math.min(
            produit.quantite,
            quantiteRestante,
          );
          quantiteRestante -= quantiteConsommee;
          const resteLot = produit.quantite - quantiteConsommee;

          await tx.produit.update({
            where: { id: produit.id },
            data: {
              quantite: resteLot,
              dateSortie: resteLot <= 0 ? new Date() : null,
            },
          });

          await tx.produit_Panier.create({
            data: {
              panier: { connect: { id: panier.id } },
              produit: { connect: { id: produit.id } },
              quantite: quantiteConsommee,
              unite: typeProduit.unite,
              prix: typeProduit.prix * quantiteConsommee,
            },
          });
        }
      }

      return tx.panier.findUniqueOrThrow({
        where: { id: panier.id },
        include: { produitPaniers: true },
      });
    });
  }
}
