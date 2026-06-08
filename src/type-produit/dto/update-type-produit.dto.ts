import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeProduitDto } from './create-type-produit.dto';

export class UpdateTypeProduitDto extends PartialType(CreateTypeProduitDto) {}
