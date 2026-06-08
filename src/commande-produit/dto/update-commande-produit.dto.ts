import { PartialType } from '@nestjs/mapped-types';
import { CreateCommandeProduitDto } from './create-commande-produit.dto';

export class UpdateCommandeProduitDto extends PartialType(
  CreateCommandeProduitDto,
) {}
