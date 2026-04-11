import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/common/service/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  public async getAllTasks(): Promise<Task[]> {
    const task = await this.prisma.task.findMany({
      orderBy:[{ name: "asc"}]
    });

    return task;
  }

  public async getTasksById(id: number): Promise<Task | null>  {
    const task = await this.prisma.task.findUnique({
      where: {id:id}
    })
    return task
  }

  public async insertTask(task: CreateTaskDto): Promise<Task> {
    const newTask = await this.prisma.task.create({
      data:task
    });
    return newTask;
  }

  public async updateTasks(id: number, taskUpdated: UpdateTaskDto): Promise<Task> {
    const task = await this.prisma.task.update({
      where: {id},
      data: taskUpdated
    })
    return task;
  }

  public async deleteTask(id: number): Promise<Task> {
    const task = await this.prisma.task.delete({
      where: {id}
    });
    return task;
  }
  // public async deleteTasks(id: number): Promise<boolean> {
  //   const query = `DELETE FROM tasks WHERE id = ${id}`;
  //   const results = await this.pg.query(query);
    
  //   return (results.rowCount ?? 0) > 0;
  // }
}
