import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateProduitDto {
  @IsUUID()
  typeProduitId: string;

  @IsNumber()
  @Min(0)
  quantite: number;

  @Type(() => Date)
  @IsDate()
  dateArrive: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateSortie?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  datePeremption?: Date;
}
