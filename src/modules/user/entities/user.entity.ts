// import { Task } from "src/modules/task/entities/task.entity";

export class User {
  id!: number;
  name!: string;
  lastname!: string;
  username!: string;
  hash?: string | null | undefined;
  password?: string;
  created_at!: Date;
  // task ?: Task[];
}