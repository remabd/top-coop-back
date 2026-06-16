import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Creneau, Prisma } from '../generated/prisma/client';
import { CreneauWhereUniqueInput } from '../generated/prisma/models';
import { PrismaService } from '../prisma.service';
import { JwtPayload } from '../auth/auth.guard';

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
    return this.prisma.creneau.findMany();
  }

  async cree(data: Prisma.CreneauCreateInput): Promise<Creneau> {
    return this.prisma.creneau.create({ data });
  }

  async modifie(params: {
    where: Prisma.CreneauWhereUniqueInput;
    data: Prisma.CreneauUpdateInput;
  }): Promise<Creneau> {
    const { where, data } = params;
    return this.prisma.creneau.update({
      data,
      where,
    });
  }

  async supprime(where: Prisma.CreneauWhereUniqueInput): Promise<Creneau> {
    return this.prisma.creneau.delete({
      where,
    });
  }

  async avecDetails(
    where: Prisma.CreneauWhereUniqueInput,
    utilisateur: JwtPayload | undefined,
  ): Promise<Creneau> {
    const creneau = await this.prisma.creneau.findUniqueOrThrow({
      where,
      include: { participations: { include: { utilisateur: true } } },
    });
    if (utilisateur) {
      throw new UnauthorizedException('Authentification requise');
    }
    if (
      creneau.participations.some(
        (participation) => participation.utilisateurId === utilisateur!.sub,
      )
    ) {
      return creneau;
    } else {
      throw new ForbiddenException(
        "Vous n'êtes pas autorisé à consulter ces informations",
      );
    }
  }
}
