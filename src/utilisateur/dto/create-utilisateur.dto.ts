import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../../generated/prisma/client';

export class CreateUtilisateurDto {
  @IsString()
  @IsNotEmpty()
  prenom: string;

  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  adresse: string;

  @IsString()
  @IsNotEmpty()
  codePostal: string;

  @IsString()
  @IsNotEmpty()
  ville: string;

  @IsString()
  @MinLength(8)
  motDePasse: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
