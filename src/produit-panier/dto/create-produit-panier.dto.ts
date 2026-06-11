import { IsNumber, IsUUID, Min, IsString } from 'class-validator';
import { Unite } from 'src/generated/prisma/enums';

export class CreateProduitPanierDto {
  @IsUUID()
  panierId: string;

  @IsUUID()
  produitId: string;

  @IsNumber()
  @Min(0)
  quantite: number;

  @IsString()
  @Min(0)
  unite: Unite;

  @IsNumber()
  @Min(0)
  prix: number;
}
