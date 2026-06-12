import { Prisma } from '../../generated/prisma/client';

export type UtilisateurAvecParticipations = Prisma.UtilisateurGetPayload<{
  include: { participations: { include: { creneau: true } } };
}>;

export type UtilisateurAvecQuota = UtilisateurAvecParticipations & {
  quota: number;
};

export type UtilisateurInfos = Prisma.UtilisateurGetPayload<{
  select: { id: true; prenom: true; nom: true; role: true };
}>;

export type ParticipationAvecCreneauEtCoParticipants =
  Prisma.ParticipationGetPayload<{
    include: {
      creneau: {
        include: {
          participations: {
            select: {
              utilisateur: { select: { id: true; prenom: true; nom: true } };
            };
          };
        };
      };
    };
  }>;
