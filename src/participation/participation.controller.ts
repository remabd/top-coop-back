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
import { ParticipationService } from './participation.service';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { UpdateParticipationDto } from './dto/update-participation.dto';
import { RoleDecorator } from '../auth/role.decorator';
import { Role } from '../generated/prisma/enums';
import type { AuthenticatedRequest } from '../auth/auth.guard';

@Controller('participation')
export class ParticipationController {
  constructor(private readonly participationService: ParticipationService) {}

  @Post()
  cree(@Body() createParticipationDto: CreateParticipationDto) {
    return this.participationService.cree(createParticipationDto);
  }

  @RoleDecorator(Role.ADMIN)
  @Get()
  tous() {
    return this.participationService.participations();
  }

  @RoleDecorator(Role.ADMIN)
  @Get(':id')
  un(@Param('id') id: string) {
    return this.participationService.participation({ id });
  }

  @RoleDecorator(Role.ADMIN)
  @Patch(':id')
  modifie(
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
  supprime(@Param('id') id: string) {
    return this.participationService.supprime({ id });
  }

  @Post()
  annule(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.participationService.annule({ id }, req.utilisateur);
  }

  @Get(':id')
  aFaire(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.participationService.aFaire(id, req.utilisateur);
  }
}
