import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TypeProduitService } from './type-produit.service';
import { CreateTypeProduitDto } from './dto/create-type-produit.dto';
import { UpdateTypeProduitDto } from './dto/update-type-produit.dto';
import { RoleDecorator } from '../auth/role.decorator';
import { Role } from '../generated/prisma/enums';

@Controller('type-produit')
export class TypeProduitController {
  constructor(private readonly typeProduitService: TypeProduitService) {}

  @RoleDecorator(Role.ADMIN)
  @Post()
  cree(@Body() createTypeProduitDto: CreateTypeProduitDto) {
    return this.typeProduitService.cree(createTypeProduitDto);
  }

  @RoleDecorator(Role.ADMIN)
  @Get()
  tous() {
    return this.typeProduitService.typeProduits();
  }

  @RoleDecorator(Role.ADMIN)
  @Get(':id')
  un(@Param('id') id: string) {
    return this.typeProduitService.typeProduit({ id });
  }

  @RoleDecorator(Role.ADMIN)
  @Patch(':id')
  modifie(
    @Param('id') id: string,
    @Body() updateTypeProduitDto: UpdateTypeProduitDto,
  ) {
    return this.typeProduitService.modifie({
      where: { id },
      data: updateTypeProduitDto,
    });
  }

  @RoleDecorator(Role.ADMIN)
  @Delete(':id')
  supprime(@Param('id') id: string) {
    return this.typeProduitService.supprime({ id });
  }
}
