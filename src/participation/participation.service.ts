import { ForbiddenException, Injectable } from '@nestjs/common';
import { Participation, Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { UpdateParticipationDto } from './dto/update-participation.dto';
import { verifieAppartenance } from '../auth/appartenance';
import { JwtPayload } from '../auth/auth.guard';

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
        ...(data.utilisateurId && {
          utilisateur: { connect: { id: data.utilisateurId } },
        }),
        ...(data.creneauId && {
          creneau: { connect: { id: data.creneauId } },
        }),
      },
    });
  }

  supprime(
    where: Prisma.ParticipationWhereUniqueInput,
  ): Promise<Participation> {
    return this.prisma.participation.delete({ where });
  }

  async annule(
    where: Prisma.ParticipationWhereUniqueInput,
    utilisateur: JwtPayload | undefined,
  ): Promise<Participation> {
    const participation = await this.prisma.participation.findUniqueOrThrow({
      where,
      include: { creneau: true },
    });
    verifieAppartenance(participation.utilisateurId, utilisateur);
    const DUREE_TROIS_JOURS = 3 * 24 * 60 * 60 * 1000;
    if (
      new Date().getTime() + DUREE_TROIS_JOURS >=
      participation.creneau.dateDebut.getTime()
    ) {
      throw new ForbiddenException(
        'Vous avez dépassé la date limite de suppression',
      );
    }
    return this.prisma.participation.delete({ where });
  }

  async aFaire(
    id: string,
    utilisateur: JwtPayload | undefined,
  ): Promise<number> {
    verifieAppartenance(id, utilisateur);
    const participations = await this.prisma.participation.findMany({
      where: { utilisateurId: id },
      include: { creneau: true },
    });
    const MS_PAR_HEURE = 1000 * 60 * 60;
    const aFaire = participations
      .filter(
        ({ creneau }) =>
          creneau.dateDebut.getMonth() === new Date().getMonth() &&
          creneau.dateDebut.getFullYear() === new Date().getFullYear(),
      )
      .reduce(
        (total, { creneau }) =>
          total -
          (creneau.dateFin.getTime() - creneau.dateDebut.getTime()) /
            MS_PAR_HEURE,
        3,
      );
    return aFaire >= 0 ? aFaire : 0;
  }
}
