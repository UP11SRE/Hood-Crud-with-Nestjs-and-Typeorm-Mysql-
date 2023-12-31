import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
//import databaseConfig from './config/database.config';
//import { DatabaseModel } from './database.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { Tasks } from './tasks.entity';
import { redisModule } from './redis/redis.module';
import { userModule } from './User/user.module';
import { Users } from './User/users.entity';
//import { RedisModule } from './redis.module';



@Module({
  imports: [
    TasksModule, userModule,
    ConfigModule.forRoot({
      isGlobal : true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, redisModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Tasks, Users],
        synchronize: false,
      }),
      inject: [ConfigService],
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//TasksModule,