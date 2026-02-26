import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(@Inject('POSTGRES_CONNECTION') private pg: Client) {}

  public async getAllTasks(): Promise<Task[]> {
    const query = `SELECT * FROM tasks ORDER BY id ASC`;
    const results = await this.pg.query(query);

    return results.rows as Task[];
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
