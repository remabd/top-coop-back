import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { RoleDecorator } from '../auth/role.decorator';
import { Role } from '../generated/prisma/enums';

@Controller('utilisateur')
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}

  @RoleDecorator(Role.ADMIN)
  @Post()
  async creer(@Body() utilisateur: CreateUtilisateurDto) {
    return this.utilisateurService.creeUtilisateur(utilisateur);
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
    return this.utilisateurService.modifieUtilisateur({
      where: { id },
      data: updateUtilisateurDto,
    });
  }

  @RoleDecorator(Role.ADMIN)
  @Delete(':id')
  supprime(@Param('id') id: string) {
    return this.utilisateurService.supprimeUtilisateur({ id });
  }
}
