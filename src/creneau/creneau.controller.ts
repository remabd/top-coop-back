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
import type { CreateCreneauDto } from './dto/create-creneau.dto';
import type { UpdateCreneauDto } from './dto/update-creneau.dto';

@Controller('creneau')
export class CreneauController {
  constructor(private readonly creneauService: CreneauService) {}

  @Post()
  create(@Body() createCreneauDto: CreateCreneauDto) {
    return this.creneauService.creeCreneau(createCreneauDto);
  }

  @Get()
  tous() {
    return this.creneauService.creneaux();
  }

  @Get(':id')
  un(@Param('id') id: string) {
    return this.creneauService.creneau({ id });
  }

  @Patch(':id')
  modifie(@Param('id') id: string, @Body() updateCreneauDto: UpdateCreneauDto) {
    return this.creneauService.modifieCreneau({
      where: { id },
      data: updateCreneauDto,
    });
  }

  @Delete(':id')
  supprime(@Param('id') id: string) {
    return this.creneauService.supprimeCreneau({ id });
  }
}
