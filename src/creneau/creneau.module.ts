import { Module } from '@nestjs/common';
import { CreneauService } from './creneau.service';
import { CreneauController } from './creneau.controller';

@Module({
  controllers: [CreneauController],
  providers: [CreneauService],
  exports: [CreneauService],
})
export class CreneauModule {}
