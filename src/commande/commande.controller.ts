import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommandeService } from './commande.service';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { RoleDecorator } from '../auth/role.decorator';
import { Role } from '../generated/prisma/enums';

@Controller('commande')
export class CommandeController {
  constructor(private readonly commandeService: CommandeService) {}

  @RoleDecorator(Role.ADMIN)
  @Post()
  cree(@Body() createCommandeDto: CreateCommandeDto) {
    return this.commandeService.cree(createCommandeDto);
  }

  @RoleDecorator(Role.ADMIN)
  @Get()
  tous() {
    return this.commandeService.commandes();
  }

  @RoleDecorator(Role.ADMIN)
  @Get(':id')
  un(@Param('id') id: string) {
    return this.commandeService.commande({ id });
  }

  @RoleDecorator(Role.ADMIN)
  @Patch(':id')
  modifie(
    @Param('id') id: string,
    @Body() updateCommandeDto: UpdateCommandeDto,
  ) {
    return this.commandeService.modifie({
      where: { id },
      data: updateCommandeDto,
    });
  }

  @RoleDecorator(Role.ADMIN)
  @Delete(':id')
  supprime(@Param('id') id: string) {
    return this.commandeService.supprime({ id });
  }
}
