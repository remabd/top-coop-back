import { Prisma } from '../../generated/prisma/client';

export type UtilisateurAvecParticipations = Prisma.UtilisateurGetPayload<{
  include: { participations: { include: { creneau: true } } };
}>;

export type UtilisateurAvecQuota = UtilisateurAvecParticipations & {
  quota: number;
};
