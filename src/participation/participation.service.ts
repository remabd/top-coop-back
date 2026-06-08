import { Injectable } from '@nestjs/common';
import { Participation, Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { UpdateParticipationDto } from './dto/update-participation.dto';

@Injectable()
export class ParticipationService {
  constructor(private prisma: PrismaService) {}

  cree(data: CreateParticipationDto): Promise<Participation> {
    return this.prisma.participation.create({
      data: {
        utilisateur: { connect: { id: data.utilisateurId } },
        creneau: { connect: { id: data.creneauId } },
      },
    });
  }

  participations(): Promise<Participation[]> {
    return this.prisma.participation.findMany();
  }

  participation(
    participationWhereUniqueInput: Prisma.ParticipationWhereUniqueInput,
  ): Promise<Participation> {
    return this.prisma.participation.findUniqueOrThrow({
      where: participationWhereUniqueInput,
    });
  }

  modifie(params: {
    where: Prisma.ParticipationWhereUniqueInput;
    data: UpdateParticipationDto;
  }): Promise<Participation> {
    const { where, data } = params;
    return this.prisma.participation.update({
      where,
      data: {
        utilisateur: { connect: { id: data.utilisateurId } },
        creneau: { connect: { id: data.creneauId } },
      },
    });
  }

  supprime(
    where: Prisma.ParticipationWhereUniqueInput,
  ): Promise<Participation> {
    return this.prisma.participation.delete({ where });
  }
}
