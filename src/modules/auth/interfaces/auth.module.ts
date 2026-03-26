import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/common/service/prisma.service';
import { UtilService } from 'src/common/service/util.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '60s'}
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UtilService],
})
export class AuthModule {}
