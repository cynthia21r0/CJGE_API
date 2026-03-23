import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/interfaces/auth.module';
import { TaskModule } from './modules/task/task.module';
import { PrismaService } from './common/services/prisma.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { UtilService } from './common/service/util.service';

@Module({
  imports: [AuthModule, TaskModule, UserModule, ConfigModule],
  providers: [UtilService],
})
export class AppModule {}
