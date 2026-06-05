import { Utilisateur } from 'src/generated/prisma/client';

export type CreateUtilisateurDto = Omit<Utilisateur, 'id' | 'dateCreation'>;
