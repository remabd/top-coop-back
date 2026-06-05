import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Creneau, Prisma } from 'src/generated/prisma/client';
import { CreneauWhereUniqueInput } from 'src/generated/prisma/models';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CreneauService {
  constructor(private prisma: PrismaService) {}

  async creneau(
    creneauWhereUniqueInput: CreneauWhereUniqueInput,
  ): Promise<Creneau> {
    try {
      return await this.prisma.creneau.findUniqueOrThrow({
        where: creneauWhereUniqueInput,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError)
        if (e.code === 'P2025') {
          throw new NotFoundException();
        }
      throw e;
    }
  }
  async creneaux(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CreneauWhereUniqueInput;
    where?: Prisma.CreneauWhereInput;
    orderBy?: Prisma.CreneauOrderByWithRelationInput;
  }): Promise<Creneau[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.creneau.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async creeCreneau(data: Prisma.CreneauCreateInput): Promise<Creneau> {
    try {
      return await this.prisma.creneau.create({ data });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') throw new ConflictException();
      }
      throw e;
    }
  }

  async modifieCreneau(params: {
    where: Prisma.CreneauWhereUniqueInput;
    data: Prisma.CreneauUpdateInput;
  }): Promise<Creneau> {
    const { where, data } = params;
    try {
      return await this.prisma.creneau.update({
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

  async supprimeCreneau(
    where: Prisma.CreneauWhereUniqueInput,
  ): Promise<Creneau> {
    try {
      return await this.prisma.creneau.delete({
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
