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

@Controller('utilisateur')
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}

  @Post()
  async creer(@Body() utilisateur: CreateUtilisateurDto) {
    return this.utilisateurService.creeUtilisateur(utilisateur);
  }

  @Get()
  tous() {
    return this.utilisateurService.utilisateurs({});
  }

  @Get(':id')
  un(@Param('id') id: string) {
    return this.utilisateurService.utilisateur({ id });
  }

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

  @Delete(':id')
  supprime(@Param('id') id: string) {
    return this.utilisateurService.supprimeUtilisateur({ id });
  }
}
