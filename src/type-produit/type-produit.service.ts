import { Injectable } from '@nestjs/common';
import { Type_Produit, Prisma, Unite } from '../generated/prisma/client';
import { PrismaService } from '../prisma.service';

type EanDonnées =
  | { type: typeof Unite.VRAC; codeArticle: string; poidsKg: number }
  | { type: typeof Unite.UNITE; codeArticle: string };

export interface TypeProduitVersPanierProduit {
  typeProduit: Type_Produit;
  quantite: number;
  unite: Unite;
  prix: number;
}

@Injectable()
export class TypeProduitService {
  constructor(private prisma: PrismaService) {}

  async typeProduit(
    where: Prisma.Type_ProduitWhereUniqueInput,
  ): Promise<Type_Produit> {
    return this.prisma.type_Produit.findUniqueOrThrow({ where });
  }

  async typeProduits(): Promise<Type_Produit[]> {
    return this.prisma.type_Produit.findMany();
  }

  async cree(data: Prisma.Type_ProduitCreateInput): Promise<Type_Produit> {
    return this.prisma.type_Produit.create({ data });
  }

  async modifie(params: {
    where: Prisma.Type_ProduitWhereUniqueInput;
    data: Prisma.Type_ProduitUpdateInput;
  }): Promise<Type_Produit> {
    const { where, data } = params;
    return this.prisma.type_Produit.update({ data, where });
  }

  async supprime(
    where: Prisma.Type_ProduitWhereUniqueInput,
  ): Promise<Type_Produit> {
    return this.prisma.type_Produit.delete({ where });
  }

  async recupereProduitPanierAvecCodeBarre(
    ean: string,
  ): Promise<TypeProduitVersPanierProduit> {
    console.log('ean', ean);
    const données = this.parseEan(ean);
    const quantite = données.type === Unite.VRAC ? données.poidsKg : 1;

    const typeProduit = await this.prisma.type_Produit.findUniqueOrThrow({
      where: { ean: données.codeArticle },
    });

    return {
      typeProduit,
      quantite,
      unite: typeProduit.unite,
      prix: typeProduit.prix * quantite,
    };
  }

  private parseEan(ean: string): EanDonnées {
    if (ean.length === 13 && ean.startsWith('2')) {
      const codeArticle = ean.slice(1, 7);
      const poidsGrammes = Number(ean.slice(7, 12));
      return { type: Unite.VRAC, codeArticle, poidsKg: poidsGrammes / 1000 };
    }
    return { type: Unite.UNITE, codeArticle: ean };
  }
}
