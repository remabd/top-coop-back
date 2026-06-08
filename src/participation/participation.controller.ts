import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ParticipationService } from './participation.service';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { UpdateParticipationDto } from './dto/update-participation.dto';
import { RoleDecorator } from '../auth/role.decorator';
import { Role } from '../generated/prisma/enums';

@Controller('participation')
export class ParticipationController {
  constructor(private readonly participationService: ParticipationService) {}

  @RoleDecorator(Role.ADMIN)
  @Post()
  create(@Body() createParticipationDto: CreateParticipationDto) {
    return this.participationService.cree(createParticipationDto);
  }

  @RoleDecorator(Role.ADMIN)
  @Get()
  findAll() {
    return this.participationService.participations();
  }

  @RoleDecorator(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participationService.participation({ id });
  }

  @RoleDecorator(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParticipationDto: UpdateParticipationDto,
  ) {
    return this.participationService.modifie({
      where: { id },
      data: updateParticipationDto,
    });
  }

  @RoleDecorator(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participationService.supprime({ id });
  }
}
