import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConnexionDto } from './dto/connexion.dto';
import { Public } from './auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  connexion(@Body() connexionDto: ConnexionDto) {
    return this.authService.authentifier(
      connexionDto.email,
      connexionDto.motDePasse,
    );
  }
}
