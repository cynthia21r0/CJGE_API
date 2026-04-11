import { Body, Controller, Delete, Get, HttpException, UseGuards, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
//import { User } from './entities/user.entity';
import { User } from 'generated/prisma/client';
import { UtilService } from 'src/common/service/util.service';
import { AuthGuard } from 'src/common/guards/auth.guards';


@Controller('/api/user')
export class UserController {
    constructor(private usersSvc: UserService,
                private utilSvs: UtilService) {}

    @Get()
    @UseGuards(AuthGuard)
    public async getAllUsers(): Promise<User[]> {
        return await this.usersSvc.getAllUsers();
    }
    
    @Get(':id')
    @UseGuards(AuthGuard)
    public async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        const result = await this.usersSvc.getUserById(id);
        if(result == undefined)
            throw new HttpException(`Usuario con ID ${id} no encontrado`, HttpStatus.NOT_FOUND);
        
        return result;
    }

    @Post('')
    public async insertUser(@Body() user: CreateUserDto): Promise<User> {
        //Verificación del nombre de usuario
        const currentUser = await this.usersSvc.getUserByUsername(user.username);
        if(currentUser)
            throw new HttpException('Nombre de usuario ya existe', HttpStatus.CONFLICT);

        //Se inserta la información
        const encryptedPassword = await this.utilSvs.hash(user.password);
        user.password = encryptedPassword;
        const result = await this.usersSvc.insertUser(user);
        
        if(!result) {
            throw new HttpException('Error al insertar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return result;
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    public async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto): Promise<User> {
        if (user.password) {
            const encryptedPassword = await this.utilSvs.hash(user.password);
            user.password = encryptedPassword;
        }
        return await this.usersSvc.updateUser(id, user);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    public async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<Boolean> {
        try {
            await this.usersSvc.deleteUser(id);
        } catch (error) {
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }
        return true;
    }
}