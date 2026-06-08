import { Injectable } from '@nestjs/common';
import { Type_Produit, Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma.service';

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
}
