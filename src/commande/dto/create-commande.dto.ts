import { IsUUID } from 'class-validator';

export class CreateCommandeDto {
  @IsUUID()
  utilisateurId: string;
}
