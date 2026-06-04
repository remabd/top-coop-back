import { Module } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurController } from './utilisateur.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [UtilisateurModule],
  controllers: [UtilisateurController],
  providers: [UtilisateurService, PrismaService],
})
export class UtilisateurModule {}
