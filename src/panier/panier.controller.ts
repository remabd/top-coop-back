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
import { PanierService } from './panier.service';
import {
  CreatePanierDto,
  DtoVersPanierComplet,
  DtoVersPanierUtilisateur,
} from './dto/create-panier.dto';
import { UpdatePanierDto } from './dto/update-panier.dto';
import { RoleDecorator } from '../auth/role.decorator';
import { Role } from '../generated/prisma/enums';
import type { AuthenticatedRequest } from '../auth/auth.guard';

@Controller('panier')
export class PanierController {
  constructor(private readonly panierService: PanierService) {}

  @RoleDecorator(Role.ADMIN)
  @Post()
  cree(@Body() createPanierDto: CreatePanierDto) {
    return this.panierService.cree(createPanierDto);
  }

  @RoleDecorator(Role.ADMIN)
  @Get()
  tous() {
    return this.panierService.paniers();
  }

  @RoleDecorator(Role.ADMIN)
  @Get('/complets')
  tousComplet() {
    return this.panierService.paniersComplets();
  }

  @RoleDecorator(Role.ADMIN)
  @Get(':id')
  un(@Param('id') id: string) {
    return this.panierService.panier({ id });
  }

  @RoleDecorator(Role.ADMIN)
  @Patch(':id')
  modifie(@Param('id') id: string, @Body() updatePanierDto: UpdatePanierDto) {
    return this.panierService.modifie({
      where: { id },
      data: updatePanierDto,
    });
  }

  @RoleDecorator(Role.ADMIN)
  @Delete(':id')
  supprime(@Param('id') id: string) {
    return this.panierService.supprime({ id });
  }

  @Post()
  creePanierComplet(
    @Body() data: DtoVersPanierComplet,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.panierService.creePanierComplet(data, req.utilisateur);
  }

  @Post('/utilisateur')
  sauverPanierdUtilisateur(
    @Body() data: DtoVersPanierUtilisateur,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.panierService.sauverPanierdUtilisateur(data, req.utilisateur);
  }
}
