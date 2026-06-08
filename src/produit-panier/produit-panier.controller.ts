import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProduitPanierService } from './produit-panier.service';
import { CreateProduitPanierDto } from './dto/create-produit-panier.dto';
import { UpdateProduitPanierDto } from './dto/update-produit-panier.dto';
import { RoleDecorator } from '../auth/role.decorator';
import { Role } from '../generated/prisma/enums';

@Controller('produit-panier')
export class ProduitPanierController {
  constructor(private readonly produitPanierService: ProduitPanierService) {}

  @RoleDecorator(Role.ADMIN)
  @Post()
  cree(@Body() createProduitPanierDto: CreateProduitPanierDto) {
    return this.produitPanierService.cree(createProduitPanierDto);
  }

  @RoleDecorator(Role.ADMIN)
  @Get()
  tous() {
    return this.produitPanierService.produitPaniers();
  }

  @RoleDecorator(Role.ADMIN)
  @Get(':id')
  un(@Param('id') id: string) {
    return this.produitPanierService.produitPanier({ id });
  }

  @RoleDecorator(Role.ADMIN)
  @Patch(':id')
  modifie(
    @Param('id') id: string,
    @Body() updateProduitPanierDto: UpdateProduitPanierDto,
  ) {
    return this.produitPanierService.modifie({
      where: { id },
      data: updateProduitPanierDto,
    });
  }

  @RoleDecorator(Role.ADMIN)
  @Delete(':id')
  supprime(@Param('id') id: string) {
    return this.produitPanierService.supprime({ id });
  }
}
