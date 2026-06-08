import { Module } from '@nestjs/common';
import { TypeProduitService } from './type-produit.service';
import { TypeProduitController } from './type-produit.controller';

@Module({
  controllers: [TypeProduitController],
  providers: [TypeProduitService],
  exports: [TypeProduitService],
})
export class TypeProduitModule {}
