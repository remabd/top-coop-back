import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UtilisateurModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
