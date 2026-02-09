import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  public getTasks(): string {
    return 'Listado de Tareas';
  }
}
