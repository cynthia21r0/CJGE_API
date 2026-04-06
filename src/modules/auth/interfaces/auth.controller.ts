import { Body, Controller, ForbiddenException, GatewayTimeoutException, Get, HttpCode, HttpStatus, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { User } from 'src/modules/user/entities/user.entity';
import { ApiOperation } from '@nestjs/swagger';
import { UtilService } from 'src/common/service/util.service';
import { AuthGuard } from '@nestjs/passport';
import { AppException } from "src/common/exceptions/app.exception";


@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authSvc: AuthService, private readonly utilSvc: UtilService) {}

  // POST /auth/register - 201 Created
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() loginDto: LoginDto): Promise<any>{
      const {username, password} = loginDto;

    // TODO: Verificar el usuario y contraseña
    const user = await this.authSvc.getUserByUsername(username);
    if (!user)
        throw new UnauthorizedException('El usuario y/o contraseña incorrecto')

    // TODO: Obtener la informacion del usuario() payload
    
    // TODO: Generar el JWT
    if (await this.utilSvc.checkPassword(password, user.password!)) {
            // Obtener la informacion del usuario (payload)
            const { password, username, ...payload } = user;

    // TODO: Devolver el JWT encriptado
    const access_token = await this.utilSvc.generateJWT(payload, '1h');

            // Generar el refresh token
            const refresh_token = await this.utilSvc.generateJWT(payload, '7d');
            const hashRT = await this.utilSvc.hash(refresh_token);

            // Asignar el hash al usuario
            await this.authSvc.updateHash(user.id, hashRT);
            payload.hash = hashRT;

            // devolver el JWT encriptado
            return {
                access_token,
                refresh_token: hashRT
            }

        } else {
            throw new UnauthorizedException('El usuario y/o contraseña son incorrectos');
        }
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  public getProfile(@Req() request: any) {
    const user = request['user'];
        return user
  }

  @Post('/refresh')
  @UseGuards(AuthGuard)
  public async refreshToken(@Req() request: any) {
    // Obtener el usuario en sesión
    const sessionUser = request['user'];
    const user = await this.authSvc.getUserById(sessionUser.id);
    // if(!user || !user.hash) throw new ForbiddenException('Acceso denegado')
    if ( !user || !user.hash)
            throw new AppException('Token invalido',HttpStatus.FORBIDDEN, '2'); //Excepcion personalizada 
            //throw new ForbiddenException('Acceso Denegado');

    // Comparar el token resivido con el token guardado
    if (sessionUser.hash != user.hash) throw new ForbiddenException('Token invalido');

    // Si el token es valido se generan nuevos tokens
    return {
        acces_token: '',
        refresh_token: ''
    }
  }
  @Post('/logout')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async logout(@Req() request: any) {
    const session = request['user'];
    const user = await this.authSvc.updateHash (session.id, null);
    return user;
  }

}
