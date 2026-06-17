import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ConnexionDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  motDePasse: string;
}
