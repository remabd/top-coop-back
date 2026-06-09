import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsNumber,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreatePanierDto {
  @IsUUID()
  utilisateurId: string;

  @IsNumber()
  @Min(0)
  prix: number;
}

class DtoVersProduitPanier {
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

export class DtoVersPanierComplet {
  @IsUUID()
  utilisateurId: string;

  @IsNumber()
  @Min(0)
  prix: number;

  @ValidateNested({ each: true })
  @Type(() => DtoVersProduitPanier)
  @ArrayMinSize(1)
  produits: DtoVersProduitPanier[];
}
