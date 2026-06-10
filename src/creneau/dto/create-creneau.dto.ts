import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Status } from '../../generated/prisma/client';

export class CreateCreneauDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @Type(() => Date)
  @IsDate()
  dateDebut: Date;

  @Type(() => Date)
  @IsDate()
  dateFin: Date;

  @IsEnum(Status)
  statut: Status;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsInt()
  @Min(0)
  capacite: number;
}
