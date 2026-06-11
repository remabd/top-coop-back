import { IsNumber, IsUUID, Min, IsEnum } from 'class-validator';
import { Unite } from '../../generated/prisma/enums';

export class CreateProduitPanierDto {
  @IsUUID()
  panierId: string;

  @IsUUID()
  produitId: string;

  @IsNumber()
  @Min(0)
  quantite: number;

  @IsEnum(Unite)
  @Min(0)
  unite: Unite;

  @IsNumber()
  @Min(0)
  prix: number;
}
