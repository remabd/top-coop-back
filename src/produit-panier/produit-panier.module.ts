import { Module } from '@nestjs/common';
import { ProduitPanierService } from './produit-panier.service';
import { ProduitPanierController } from './produit-panier.controller';

@Module({
  controllers: [ProduitPanierController],
  providers: [ProduitPanierService],
  exports: [ProduitPanierService],
})
export class ProduitPanierModule {}
