import { Module } from '@nestjs/common';
//import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from 'src/tasks.entity';
import { TasksController } from './tasks.controller';
import { redisModule } from 'src/redis/redis.module';
//import { TasksRepository } from './TasksRepository';

@Module({
  imports : [TypeOrmModule.forFeature([Tasks]), redisModule],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
