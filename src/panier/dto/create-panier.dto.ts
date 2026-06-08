import { IsNumber, IsUUID, Min } from 'class-validator';

export class CreatePanierDto {
  @IsUUID()
  utilisateurId: string;

  @IsNumber()
  @Min(0)
  prix: number;
}
