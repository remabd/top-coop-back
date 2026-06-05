import { Creneau } from 'src/generated/prisma/client';

export type CreateCreneauDto = Omit<Creneau, 'id' | 'dateCreation'>;
