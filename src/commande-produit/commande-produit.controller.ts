import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommandeProduitService } from './commande-produit.service';
import { CreateCommandeProduitDto } from './dto/create-commande-produit.dto';
import { UpdateCommandeProduitDto } from './dto/update-commande-produit.dto';
import { RoleDecorator } from '../auth/role.decorator';
import { Role } from '../generated/prisma/enums';

@Controller('commande-produit')
export class CommandeProduitController {
  constructor(
    private readonly commandeProduitService: CommandeProduitService,
  ) {}

  @RoleDecorator(Role.ADMIN)
  @Post()
  cree(@Body() createCommandeProduitDto: CreateCommandeProduitDto) {
    return this.commandeProduitService.cree(createCommandeProduitDto);
  }

  @RoleDecorator(Role.ADMIN)
  @Get()
  tous() {
    return this.commandeProduitService.commandeProduits();
  }

  @RoleDecorator(Role.ADMIN)
  @Get(':id')
  un(@Param('id') id: string) {
    return this.commandeProduitService.commandeProduit({ id });
  }

  @RoleDecorator(Role.ADMIN)
  @Patch(':id')
  modifie(
    @Param('id') id: string,
    @Body() updateCommandeProduitDto: UpdateCommandeProduitDto,
  ) {
    return this.commandeProduitService.modifie({
      where: { id },
      data: updateCommandeProduitDto,
    });
  }

  @RoleDecorator(Role.ADMIN)
  @Delete(':id')
  supprime(@Param('id') id: string) {
    return this.commandeProduitService.supprime({ id });
  }
}
