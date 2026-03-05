import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/interfaces/auth.module';
import { TaskModule } from './modules/task/task.module';
import { PrismaService } from './common/services/prisma.service';

@Module({
  imports: [AuthModule, TaskModule],
})
export class AppModule {}
