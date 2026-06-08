import { Injectable } from '@nestjs/common';
import { Panier, Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma.service';
import { CreatePanierDto } from './dto/create-panier.dto';
import { UpdatePanierDto } from './dto/update-panier.dto';

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
}
