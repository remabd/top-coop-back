import { Module } from '@nestjs/common';
import { CreneauService } from './creneau.service';
import { CreneauController } from './creneau.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CreneauController],
  providers: [CreneauService, PrismaService],
  exports: [CreneauService],
})
export class CreneauModule {}
