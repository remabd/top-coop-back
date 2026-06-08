import { SetMetadata } from '@nestjs/common';
import { Role } from '../generated/prisma/enums';

export const ROLES_KEY = 'role';
export const RoleDecorator = (role: Role) => SetMetadata(ROLES_KEY, role);
