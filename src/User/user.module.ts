import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { userController } from "./user.controller";
import { UserService } from "./user.service";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { Users } from "./users.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports :[TypeOrmModule.forFeature([Users]), JwtModule.register({})],
    providers : [UserService, JwtStrategy],
    controllers : [userController],
})

export class userModule{}