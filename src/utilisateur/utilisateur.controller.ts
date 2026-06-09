import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { RoleDecorator } from '../auth/role.decorator';
import { Role } from '../generated/prisma/enums';
import type { AuthenticatedRequest } from '../auth/auth.guard';

@Controller('utilisateur')
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}

  @RoleDecorator(Role.ADMIN)
  @Post()
  async cree(@Body() utilisateur: CreateUtilisateurDto) {
    return this.utilisateurService.cree(utilisateur);
  }

  @RoleDecorator(Role.ADMIN)
  @Get()
  tous() {
    return this.utilisateurService.utilisateurs();
  }

  @RoleDecorator(Role.ADMIN)
  @Get(':id')
  un(@Param('id') id: string) {
    return this.utilisateurService.utilisateur({ id });
  }

  @RoleDecorator(Role.ADMIN)
  @Patch(':id')
  modifie(
    @Param('id') id: string,
    @Body() updateUtilisateurDto: UpdateUtilisateurDto,
  ) {
    return this.utilisateurService.modifie({
      where: { id },
      data: updateUtilisateurDto,
    });
  }

  @RoleDecorator(Role.ADMIN)
  @Delete(':id')
  supprime(@Param('id') id: string) {
    return this.utilisateurService.supprime({ id });
  }

  @Get(':id')
  voirParticipations(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.utilisateurService.voirParticipations(id, req.utilisateur);
  }

  @Get(':id')
  voirPaniers(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.utilisateurService.voirPaniers(id, req.utilisateur);
  }

  @Get(':id')
  voirInformations(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.utilisateurService.voirInfos(id, req.utilisateur);
  }
}
