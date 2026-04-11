import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { pgProvider } from 'src/common/providers/pg.provider';
import { PrismaService } from 'src/common/service/prisma.service';
import { UtilService } from 'src/common/service/util.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, PrismaService, UtilService],
})
export class TaskModule {}
