import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

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
  public insertTask(@Body() task: CreateTaskDto): any {
    console.error('insert', typeof task);
    return this.taskSvc.insertTask(task);
  }

  @Put(':id')
  public updateTask(id: number, task: any): any {
    return this.taskSvc.updateTasks(task);
  }

  @Delete(':id')
  public deleteTask(id: number) {
    this.taskSvc.deleteTasks(id);
  }
}
