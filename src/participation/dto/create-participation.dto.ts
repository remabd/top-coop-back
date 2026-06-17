import { IsUUID } from 'class-validator';

export class CreateParticipationDto {
  @IsUUID()
  utilisateurId: string;

  @IsUUID()
  creneauId: string;
}
