import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { AuthModule } from './auth/auth.module';
import { CreneauModule } from './creneau/creneau.module';

@Module({
  imports: [UtilisateurModule, AuthModule, CreneauModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
