import { Role } from 'src/generated/prisma/enums';

export class CreateUtilisateurDto {
  nom: string;
  prenom: string;
  email: string;
  adresse: string;
  codePostal: string;
  ville: string;
  motDePasse: string;
  role: Role;
  dateCreation: string;
}
