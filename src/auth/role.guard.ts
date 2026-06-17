import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../generated/prisma/enums';
import { ROLES_KEY } from './role.decorator';
import { AuthenticatedRequest } from './auth.guard';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRole) {
      return true;
    }
    const { utilisateur } = context
      .switchToHttp()
      .getRequest<AuthenticatedRequest>();
    if (!utilisateur) {
      return false;
    }
    return utilisateur.role === requiredRole;
  }
}
