import { PartialType } from '@nestjs/mapped-types';
import { CreateProduitPanierDto } from './create-produit-panier.dto';

export class UpdateProduitPanierDto extends PartialType(
  CreateProduitPanierDto,
) {}
