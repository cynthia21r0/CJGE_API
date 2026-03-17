import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/common/services/prisma.service';
import { LoginDto } from '../dto/login.dto';
import { User } from 'src/modules/user/entities/user.entity';
import { UtilService } from 'src/common/service/util/util.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private utilService: UtilService,
    private jwtService: JwtService
  ) {}

  async login(userLogin: LoginDto): Promise<User | null> {

    // buscar usuario por username
    const user = await this.prisma.user.findUnique({
      where: { username: userLogin.username }
    });

    if (!user) {
      return null;
    }

    // validar contraseña
    const validPassword = await this.utilService.comparePassword(
      userLogin.password,
      user.password
    );

    if (!validPassword) {
      return null;
    }

    // generar payload
    const payload = {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      created_At: user.created_at
    };

    // access token (60s)
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '60s'
    });

    // refresh token (7 días)
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d'
    });

    // guardar refresh token
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken }
    });

    // agregar tokens al objeto usuario (opcional)
    return {
      ...user,
      accessToken,
      refreshToken
    } as any;
  }
}
