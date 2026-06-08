import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/generated/prisma/enums';

export const ROLES_KEY = 'role';
export const RoleDecorator = (role: Role) => SetMetadata(ROLES_KEY, role);
