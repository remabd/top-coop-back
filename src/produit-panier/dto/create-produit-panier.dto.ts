import { IsNumber, IsUUID, Min } from 'class-validator';

export class CreateProduitPanierDto {
  @IsUUID()
  panierId: string;

  @IsUUID()
  produitId: string;

  @IsNumber()
  @Min(0)
  quantite: number;

  @IsNumber()
  @Min(0)
  unite: number;

  @IsNumber()
  @Min(0)
  prix: number;
}
