import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'generated/prisma/client';

@Injectable()
export class UserService {
  constructor(
    @Inject('POSTGRES_CONNECTION') private pg: Client,
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
        password: true,
        created_at: true,
      },
    });
    return users;
  }

  public async getUserById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    return user;
  }
  public async getUserByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { username: username },
    });
    return user;
  }

  public async insertUser(user: CreateUserDto): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: user,
    });
    return newUser;
  }

  public async updateUser(id: number, userUpdated: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: userUpdated,
    });
    return user;
  }

    public async deleteUser(id: number): Promise<User> {
    const user = await this.prisma.user.delete({
      where: { id },
    });
    return user;
  }
}
