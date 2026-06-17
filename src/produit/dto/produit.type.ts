import { Prisma } from '../../generated/prisma/client';

export type ProduitAvecType = Prisma.ProduitGetPayload<{
  include: { typeProduit: true };
}>;
