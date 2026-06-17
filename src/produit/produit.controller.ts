import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProduitService } from './produit.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { RoleDecorator } from '../auth/role.decorator';
import { Role } from '../generated/prisma/enums';

@Controller('produit')
export class ProduitController {
  constructor(private readonly produitService: ProduitService) {}

  @RoleDecorator(Role.ADMIN)
  @Post()
  cree(@Body() createProduitDto: CreateProduitDto) {
    return this.produitService.cree(createProduitDto);
  }

  @Get()
  tous() {
    return this.produitService.produits();
  }

  @Get('avecType')
  avecType() {
    return this.produitService.produitsAvecType();
  }

  @Get(':id')
  un(@Param('id') id: string) {
    return this.produitService.produit({ id });
  }

  @RoleDecorator(Role.ADMIN)
  @Patch(':id')
  modifie(@Param('id') id: string, @Body() updateProduitDto: UpdateProduitDto) {
    return this.produitService.modifie({
      where: { id },
      data: updateProduitDto,
    });
  }

  @RoleDecorator(Role.ADMIN)
  @Delete(':id')
  supprime(@Param('id') id: string) {
    return this.produitService.supprime({ id });
  }
}
