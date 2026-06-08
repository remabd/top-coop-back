import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Unite } from '../../generated/prisma/client';

export class CreateTypeProduitDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsNumber()
  @Min(0)
  quantiteMax: number;

  @IsEnum(Unite)
  unite: Unite;

  @IsNumber()
  @Min(0)
  prix: number;
}
