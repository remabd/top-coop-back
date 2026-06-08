import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './auth.decorator';
import { Reflector } from '@nestjs/core';
import { Role } from '../generated/prisma/enums';

export interface JwtPayload {
  sub: number;
  email: string;
  role: Role;
}

export interface AuthenticatedRequest extends Request {
  utilisateur?: JwtPayload;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const estPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (estPublic) {
      return true;
    }
    const requete = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extraitTokendeRequete(requete);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
      requete.utilisateur = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extraitTokendeRequete(requete: Request): string | undefined {
    const [type, token] = requete.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
