import { Injectable } from '@nestjs/common';
import { Produit, Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';

@Injectable()
export class ProduitService {
  constructor(private prisma: PrismaService) {}

  cree(data: CreateProduitDto): Promise<Produit> {
    return this.prisma.produit.create({
      data: {
        quantite: data.quantite,
        dateArrive: data.dateArrive,
        dateSortie: data.dateSortie,
        datePeremption: data.datePeremption,
        typeProduit: { connect: { id: data.typeProduitId } },
      },
    });
  }

  produits(): Promise<Produit[]> {
    return this.prisma.produit.findMany();
  }

  produitsAvecType(): Promise<Produit[]> {
    return this.prisma.produit.findMany({
      include: { typeProduit: true },
    });
  }

  produit(where: Prisma.ProduitWhereUniqueInput): Promise<Produit> {
    return this.prisma.produit.findUniqueOrThrow({ where });
  }

  modifie(params: {
    where: Prisma.ProduitWhereUniqueInput;
    data: UpdateProduitDto;
  }): Promise<Produit> {
    const { where, data } = params;
    return this.prisma.produit.update({
      where,
      data: {
        ...(data.quantite !== undefined && { quantite: data.quantite }),
        ...(data.dateArrive !== undefined && { dateArrive: data.dateArrive }),
        ...(data.dateSortie !== undefined && { dateSortie: data.dateSortie }),
        ...(data.datePeremption !== undefined && {
          datePeremption: data.datePeremption,
        }),
        ...(data.typeProduitId && {
          typeProduit: { connect: { id: data.typeProduitId } },
        }),
      },
    });
  }

  supprime(where: Prisma.ProduitWhereUniqueInput): Promise<Produit> {
    return this.prisma.produit.delete({ where });
  }
}
