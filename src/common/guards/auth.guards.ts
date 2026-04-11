import { Request } from 'express';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UtilService } from '../service/util.service';
import { PrismaService } from '../service/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly utilSvc: UtilService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException('No se proporcionó un token');

    try {
      const payload = await this.utilSvc.getPayload(token);

            const user = await this.prisma.user.findUnique({
                where: { id: payload.id }
            });

            if (!user || !user.hash || payload.hash !== user.hash) {
            throw new UnauthorizedException('Sesión inválida, expirada o cerrada');
            }

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type == 'Bearer' ? token : null;
  }
}
