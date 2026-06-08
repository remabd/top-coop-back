import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreneauService } from './creneau.service';
import { CreateCreneauDto } from './dto/create-creneau.dto';
import { UpdateCreneauDto } from './dto/update-creneau.dto';
import { RoleDecorator } from '../auth/role.decorator';
import { Role } from '../generated/prisma/enums';

@Controller('creneau')
export class CreneauController {
  constructor(private readonly creneauService: CreneauService) {}

  @RoleDecorator(Role.ADMIN)
  @Post()
  cree(@Body() createCreneauDto: CreateCreneauDto) {
    return this.creneauService.cree(createCreneauDto);
  }

  @RoleDecorator(Role.ADMIN)
  @Get()
  tous() {
    return this.creneauService.creneaux();
  }

  @RoleDecorator(Role.ADMIN)
  @Get(':id')
  un(@Param('id') id: string) {
    return this.creneauService.creneau({ id });
  }

  @RoleDecorator(Role.ADMIN)
  @Patch(':id')
  modifie(@Param('id') id: string, @Body() updateCreneauDto: UpdateCreneauDto) {
    return this.creneauService.modifie({
      where: { id },
      data: updateCreneauDto,
    });
  }

  @RoleDecorator(Role.ADMIN)
  @Delete(':id')
  supprime(@Param('id') id: string) {
    return this.creneauService.supprime({ id });
  }
}
