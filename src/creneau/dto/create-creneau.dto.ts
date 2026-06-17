import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

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

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsInt()
  @Min(0)
  capacite: number;
}
