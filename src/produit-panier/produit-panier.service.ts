import { Injectable } from '@nestjs/common';
import { Produit_Panier, Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateProduitPanierDto } from './dto/create-produit-panier.dto';
import { UpdateProduitPanierDto } from './dto/update-produit-panier.dto';

@Injectable()
export class ProduitPanierService {
  constructor(private prisma: PrismaService) {}

  cree(data: CreateProduitPanierDto): Promise<Produit_Panier> {
    return this.prisma.produit_Panier.create({
      data: {
        quantite: data.quantite,
        unite: data.unite,
        prix: data.prix,
        panier: { connect: { id: data.panierId } },
        produit: { connect: { id: data.produitId } },
      },
    });
  }

  produitPaniers(): Promise<Produit_Panier[]> {
    return this.prisma.produit_Panier.findMany();
  }

  produitPanier(
    where: Prisma.Produit_PanierWhereUniqueInput,
  ): Promise<Produit_Panier> {
    return this.prisma.produit_Panier.findUniqueOrThrow({ where });
  }

  modifie(params: {
    where: Prisma.Produit_PanierWhereUniqueInput;
    data: UpdateProduitPanierDto;
  }): Promise<Produit_Panier> {
    const { where, data } = params;
    return this.prisma.produit_Panier.update({
      where,
      data: {
        ...(data.quantite !== undefined && { quantite: data.quantite }),
        ...(data.unite !== undefined && { unite: data.unite }),
        ...(data.prix !== undefined && { prix: data.prix }),
        ...(data.panierId && { panier: { connect: { id: data.panierId } } }),
        ...(data.produitId && {
          produit: { connect: { id: data.produitId } },
        }),
      },
    });
  }

  supprime(
    where: Prisma.Produit_PanierWhereUniqueInput,
  ): Promise<Produit_Panier> {
    return this.prisma.produit_Panier.delete({ where });
  }
}
