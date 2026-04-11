import { Module } from "@nestjs/common";
import { PrismaService } from "src/common/service/prisma.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UtilService } from "src/common/service/util.service";

@Module({
    controllers: [UserController],
    providers: [UserService, PrismaService, UtilService],
})
export class UserModule {}