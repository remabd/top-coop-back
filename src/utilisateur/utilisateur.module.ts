import { Module } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurController } from './utilisateur.controller';

@Module({
  imports: [UtilisateurModule],
  controllers: [UtilisateurController],
  providers: [UtilisateurService],
  exports: [UtilisateurService],
})
export class UtilisateurModule {}
