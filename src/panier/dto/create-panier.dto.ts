import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsNumber,
  IsUUID,
  Min,
  ValidateNested,
  IsString,
} from 'class-validator';
import { Unite } from 'src/generated/prisma/enums';

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

  @IsString()
  @Min(0)
  unite: Unite;

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
