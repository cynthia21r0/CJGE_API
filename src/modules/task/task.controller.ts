import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/common/guards/auth.guards';

@Controller('/api/task')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private taskSvc: TaskService) {}

  //! http:localhost:3000/api/task
  @Get()
  public async getAllTasks(@Req() req: any): Promise<Task[]> {
    const userId = req.user.id; // Obtenemos el ID del usuario autenticado
    return await this.taskSvc.getAllTasks(userId);
  }

  //! http:localhost:3000/api/task/1
  @Get(':id')
  public async listTasksById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Task> {
    const result = await this.taskSvc.getTasksById(id);
    console.log('Tipo de dato:', typeof result);
    if (result == undefined)
      throw new HttpException(
        `Tarea con ID ${id} no encontrada`,
        HttpStatus.NOT_FOUND,
      );

    return result;
  }

  @Post('')
  public async insertTask(@Body() task: CreateTaskDto): Promise<Task> {
    const result = await this.taskSvc.insertTask(task);

    if (!result) {
      throw new HttpException(
        'Error al insertar la tarea',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return result;
  }

  @Put(':id')
  public async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() task: UpdateTaskDto,
  ): Promise<Task> {
    return await this.taskSvc.updateTasks(id, task);
  }

  @Delete(':id')
  public async deleteTask(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<boolean> {
    try {
      await this.taskSvc.deleteTask(id);
    } catch (error) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return true;
  }
}
