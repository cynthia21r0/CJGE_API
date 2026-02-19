import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  public getAllTasks(): string {
    return 'Obteniendo todas las tareas';
  }

  public getTasksById(id: number): string {
    return `Obteniendo tarea con ID: ${id}`;
  }

  public insertTask(task: any): any {
    return task;
  }

  public updateTasks(task: any): any {
    return task;
  }

  public deleteTasks(task: any): any {
    return task;
  }
}
