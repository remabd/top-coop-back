import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { AuthModule } from './auth/auth.module';
import { CreneauModule } from './creneau/creneau.module';
import { PrismaExceptionFilter } from './prisma.exception';
import { PrismaModule } from './prisma.module';
import { ParticipationModule } from './participation/participation.module';

@Module({
  imports: [
    UtilisateurModule,
    AuthModule,
    CreneauModule,
    PrismaModule,
    ParticipationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
  ],
})
export class AppModule {}
