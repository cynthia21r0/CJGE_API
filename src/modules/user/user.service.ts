import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { PrismaService } from 'src/common/service/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'generated/prisma/client';

@Injectable()
export class UserService {
  constructor(
    // @Inject('POSTGRES_CONNECTION') private pg: Client,
    private prisma: PrismaService,
  ) {}

  public async getAllUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      orderBy: [{ name: 'asc' }],
      select: {
        id: true,
        name: true,
        lastname: true,
        username: true,
        password: true, //deberia ser false
        hash: true,
        created_at: true
      },
    });
    return users;
  }

  public async getUserById(id: number): Promise<User | null> { //el id: number cumple para el elemento parametrizado mas abajo
        const user = await this.prisma.user.findUnique({
            where: { id }, //elemento parametrizado si el parametro se llama igual al que se setea aqui se puede dejar como {id} nadamas
            select: {
                id: true,
                name: true,
                lastname: true,
                username: true,
                password: true, //debe de ser false
                hash: true,
                created_at: true
            }
        });
        return user;
  }

  public async getUserByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { username: username },
    });
    return user;
  }

  public async updateUser(id: number, userUpdated: UpdateUserDto): Promise<User> {
        const user = await this.prisma.user.update({
            where: { id },
            data: userUpdated
        });

        return user;
    }

    public async insertUser(user: CreateUserDto): Promise<User> {
        const newUser = await this.prisma.user.create({
            data: user
        });

        return newUser;
    }

    public async deleteUser(id: number): Promise<User> {
    // 1. Primero buscamos si el usuario tiene tareas sin borrarlo todavía
    const userWithTasks = await this.prisma.user.findUnique({
        where: { id },
        include: { task: true }
    });

    if (!userWithTasks) {
        throw new BadRequestException('El usuario no existe');
    }

    // 2. Verificamos la restricción de tareas
    if (userWithTasks.task && userWithTasks.task.length > 0) {
        throw new BadRequestException(
            'No se puede eliminar el usuario porque tiene tareas asignadas',
        );
    }

    // 3. Ahora que estamos seguros, borramos UNA SOLA VEZ
    return await this.prisma.user.delete({
        where: { id }
        });
    }
}
