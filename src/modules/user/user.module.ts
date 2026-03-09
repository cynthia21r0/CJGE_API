import { Module } from "@nestjs/common";
import { pgProvider } from "src/common/providers/pg.provider";
import { PrismaService } from "src/common/services/prisma.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    controllers: [UserController],
    providers: [UserService, pgProvider, PrismaService],
})
export class UserModule {}