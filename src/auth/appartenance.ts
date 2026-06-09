import { UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtPayload } from './auth.guard';

export function verifieAppartenance(
  id: string,
  utilisateur: JwtPayload | undefined,
) {
  if (!utilisateur) {
    throw new UnauthorizedException('Authentification requise');
  }
  if (id !== utilisateur.sub) {
    throw new ForbiddenException(
      "Vous n'êtes pas autorisé à consulter ces informations",
    );
  }
}
