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
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/generated/prisma/enums';

@Controller('creneau')
export class CreneauController {
  constructor(private readonly creneauService: CreneauService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createCreneauDto: CreateCreneauDto) {
    return this.creneauService.creeCreneau(createCreneauDto);
  }

  @Roles(Role.ADMIN)
  @Get()
  tous() {
    return this.creneauService.creneaux();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  un(@Param('id') id: string) {
    return this.creneauService.creneau({ id });
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  modifie(@Param('id') id: string, @Body() updateCreneauDto: UpdateCreneauDto) {
    return this.creneauService.modifieCreneau({
      where: { id },
      data: updateCreneauDto,
    });
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  supprime(@Param('id') id: string) {
    return this.creneauService.supprimeCreneau({ id });
  }
}
