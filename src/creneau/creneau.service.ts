import { Injectable } from '@nestjs/common';
import { Creneau, Prisma } from '../generated/prisma/client';
import { CreneauWhereUniqueInput } from '../generated/prisma/models';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CreneauService {
  constructor(private prisma: PrismaService) {}

  async creneau(
    creneauWhereUniqueInput: CreneauWhereUniqueInput,
  ): Promise<Creneau> {
    return this.prisma.creneau.findUniqueOrThrow({
      where: creneauWhereUniqueInput,
    });
  }

  async creneaux(): Promise<Creneau[]> {
    return this.prisma.creneau.findMany({});
  }

  async creeCreneau(data: Prisma.CreneauCreateInput): Promise<Creneau> {
    return this.prisma.creneau.create({ data });
  }

  async modifieCreneau(params: {
    where: Prisma.CreneauWhereUniqueInput;
    data: Prisma.CreneauUpdateInput;
  }): Promise<Creneau> {
    const { where, data } = params;
    return this.prisma.creneau.update({
      data,
      where,
    });
  }

  async supprimeCreneau(
    where: Prisma.CreneauWhereUniqueInput,
  ): Promise<Creneau> {
    return this.prisma.creneau.delete({
      where,
    });
  }
}
