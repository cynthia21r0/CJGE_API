import {
  Body,
  Controller,
  ForbiddenException,
  GatewayTimeoutException,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { UtilService } from 'src/common/service/util.service';
import { AppException } from 'src/common/exceptions/app.exception';
import { AuthGuard } from 'src/common/guards/auth.guards';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authSvc: AuthService,
    private readonly utilSvc: UtilService,
  ) {}

  // POST /auth/register - 201 Created
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;

    const user = await this.authSvc.getUserByUsername(username);
    if (!user)
      throw new UnauthorizedException('El usuario y/o contraseña incorrecto');

    if (await this.utilSvc.checkPassword(password, user.password!)) {
      // 1. Preparamos el payload básico (sin el hash todavía)
      const { password: _, username: __, hash: ___, ...tempPayload } = user;

      // 2. Generamos el refresh token
      const refresh_token = await this.utilSvc.generateJWT(tempPayload, '7d');
      const hashRT = await this.utilSvc.hash(refresh_token);

      // 3. ACTUALIZAMOS LA BASE DE DATOS PRIMERO
      await this.authSvc.updateHash(user.id, hashRT);

      // 4. AHORA SÍ, incluimos el hash actualizado en el payload final
      const finalPayload = {
        ...tempPayload,
        hash: hashRT,
      };

      // 5. Generamos el access_token con el payload que ya tiene el hash correcto
      const access_token = await this.utilSvc.generateJWT(finalPayload, '1h');

      return {
        access_token,
        refresh_token: hashRT,
      };
    } else {
      throw new UnauthorizedException(
        'El usuario y/o contraseña son incorrectos',
      );
    }
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  public getProfile(@Req() request: any) {
    const user = request['user'];
    return user;
  }

  @Post('/refresh')
  @UseGuards(AuthGuard)
  public async refreshToken(@Req() request: any) {
    const sessionUser = request['user'];
    const user = await this.authSvc.getUserById(sessionUser.id);

    if (!user || !user.hash)
      throw new AppException('Token invalido', HttpStatus.FORBIDDEN, '2');

    // Ahora la comparación será exitosa porque el token lleva el hash que está en la BD
    if (sessionUser.hash !== user.hash)
      throw new ForbiddenException('Token invalido');

    // Generar nuevos tokens reales para que no devuelva vacío
    const { password: _, username: __, hash: ___, ...payload } = user;
    const new_access_token = await this.utilSvc.generateJWT(payload, '1h');

    return {
      access_token: new_access_token,
      refresh_token: user.hash,
    };
  }
  
  @Post('/logout')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async logout(@Req() request: any) {
    const session = request['user'];
    const user = await this.authSvc.updateHash(session.id, null);
    return user;
  }
}
