import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('/api/task')
export class TaskController {
  constructor(private taskSvc: TaskService) {}

  //! http:localhost:3000/api/task
  @Get()
  public getAllTasks(): string {
    return this.taskSvc.getAllTasks();
  }

  //! http:localhost:3000/api/task/1
  @Get(':id')
  public listTasksById(@Param('id') id: string) {
    return this.taskSvc.getTasksById(parseInt(id));
  }

  @Post()
  public insertTask(task: any): any {
    this.taskSvc.insertTask(task);
  }

  @Put(':id')
  public updateTask(id: number, task: any): any {
    this.taskSvc.updateTasks(task);
  }

  @Delete(':id')
  public deleteTask(id: number) {
    this.taskSvc.deleteTasks(id);
  }
}
