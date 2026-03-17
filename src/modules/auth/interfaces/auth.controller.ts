import { Body, Controller, Get, HttpCode,HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { User } from 'src/modules/user/entities/user.entity';
import { ApiOperation } from '@nestjs/swagger';

@Controller('/api/auth')
export class AuthController {
  constructor(private authSvc: AuthService) {}

  // POST /auth/register - 201 Created

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() user:LoginDto): Promise<User> {
    const { username, password } = user;

    // TODO: Verificar el usuario y contraseña

    // TODO: Obtener la informacion del usuario() payload
    const result = await this.authSvc.login(user);

    // TODO: Generar el JWT
    if (result == undefined || result == null) {
        throw new HttpException(
            `Usuario o contraseña incorrectos`,
            HttpStatus.UNAUTHORIZED,
        );
    }

    // TODO: Devolver el JWT encriptado
    return result;
    }


  @Get('/me')
  public getProfile() {

  }

  @Post('/refresh')
  public refreshToken() {
    
  }
  @Post('/logout')
  public logout() {
  }

}
