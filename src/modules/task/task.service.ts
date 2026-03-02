import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(@Inject('POSTGRES_CONNECTION') private pg: Client) {}

  public async getAllTasks(): Promise<Task[]> {
    const query = `SELECT * FROM tasks ORDER BY id ASC`;
    const result = await this.pg.query(query);

    return result.rows as Task[];
  }

  public async getTasksById(id: number): Promise<Task> {
    const query = `SELECT * FROM tasks WHERE id = ${id}`;
    const result = (await this.pg.query(query)).rows as Task[];
    
    return result[0] as Task;
  }

  public async insertTask(task: CreateTaskDto): Promise<Task> {
    const sql = `INSERT INTO tasks
                (name, description, priority, user_id)
                VALUES
                ('${task.name}', '${task.description}', ${task.priority}, ${task.user_id}) RETURNING *`;
    const results = await this.pg.query(sql);
    const insertId = results.rows[0].id;
    return await this.getTasksById(insertId);
  }

  public async updateTasks(id: number, taskUpdated: UpdateTaskDto): Promise<Task> {

    const task = await this.getTasksById(id);
    task.name = taskUpdated.name ?? task.name;
    task.description = taskUpdated.description ?? task.description;
    task.priority = taskUpdated.priority ?? task.priority;
    
    const query = `UPDATE tasks
                    SET name = '${task.name}', description = '${task.description}', priority = ${task.priority}
                    WHERE id = ${id}`;
    await this.pg.query(query);
    return await this.getTasksById(id);
  }

  public async deleteTasks(id: number): Promise<boolean> {
    const query = `DELETE FROM tasks WHERE id = ${id}`;
    const results = await this.pg.query(query);
    
    return (results.rowCount ?? 0) > 0;
  }
}
