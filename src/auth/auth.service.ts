import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly utilisateurService: UtilisateurService,
    private jwtService: JwtService,
  ) {}

  async authentifier(email: string, motDePasse: string): Promise<any> {
    const utilisateur = await this.utilisateurService.utilisateur({
      id: undefined,
      email,
    });
    try {
      const egal = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
      if (!egal) {
        throw new UnauthorizedException('Email ou mot de passe incorrect');
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
    const payload = {
      sub: utilisateur.id,
      email: utilisateur.email,
      role: utilisateur.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      role: utilisateur.role,
    };
  }
}
