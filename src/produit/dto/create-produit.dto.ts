import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateProduitDto {
  @IsUUID()
  typeProduitId: string;

  @IsNumber()
  @Min(0)
  quantite: number;

  @Type(() => Date)
  @IsDate()
  dateArrive: Date;

  @Type(() => Date)
  @IsDate()
  dateSortie: Date;

  @Type(() => Date)
  @IsDate()
  datePeremption: Date;
}
