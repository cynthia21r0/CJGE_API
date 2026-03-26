import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { pgProvider } from 'src/common/providers/pg.provider';
import { PrismaService } from 'src/common/service/prisma.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, pgProvider, PrismaService],
})
export class TaskModule {}
