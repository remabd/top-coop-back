import { IsNumber, IsUUID, Min } from 'class-validator';

export class CreateCommandeProduitDto {
  @IsUUID()
  commandeId: string;

  @IsUUID()
  typeProduitId: string;

  @IsNumber()
  @Min(0)
  quantite: number;
}
