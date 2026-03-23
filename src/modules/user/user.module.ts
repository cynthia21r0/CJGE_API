import { Module } from "@nestjs/common";
import { PrismaService } from "src/common/services/prisma.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UtilService } from "src/common/service/util.service";
import { JwtService } from '@nestjs/jwt';

@Module({
    controllers: [UserController],
    providers: [UserService, PrismaService, UtilService, JwtService],
})
export class UserModule {}