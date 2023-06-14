import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.module';
//import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tasks } from 'src/tasks.entity';
import { createTasksDto } from './create-tasks-dto';
import Redis from 'ioredis';
import { title } from 'process';
import { empty } from 'rxjs';
//import { TasksRepository } from './TasksRepository';
//import { Task } from './task.entity';
//import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {

  //  tasks = [];

  // getalltask() : Task[]
  // {
  //     return this.tasks;
  // }

  // getTaskById(id : string) :Task{

  //     return this.tasks.find(task => task.id === id);
  // }

  // createTask(title:string,description:string):Task{
  //     const id=new Date().toString();
  //     const task:Task={
  //       id,
  //       title,
  //       description,
  //       status:TaskStatus.Open
  //     }
  //     this.tasks.push(task)
  // return task
  //   }

  //   deleteTask({ id }: { id: string; }){
  //     this.tasks=this.tasks.filter(task=>task.id!==id)
  //   }

 

  constructor(
    //private taskRepository : TasksRepository,
    @InjectRepository(Tasks) private readonly taskRepository: Repository<Tasks>, @Inject('REDIS_CLIENT') private redisClient: Redis
  ) {}

  async getAllTasks() {
   const redisData = await this.redisClient.get('redis_key');
   console.log()
    if (redisData) {
      console.log({
        redisData,
      })
      return JSON.parse(redisData);

   }


    // return this.taskRepository.find();

    const db_deta = await this.taskRepository.find();

    await this.redisClient.set('redis_key',JSON.stringify(db_deta));
    
     return db_deta;

    
  }

    async getTaskById(id: string): Promise<any> {
      const task = await this.taskRepository.findOne({ where: { id: Number(id) } });
      // await this.redisClient.set('New_key', JSON.stringify(task));

      if (!task) {
        throw new NotFoundException(`Task with ID "${id}" not found`);
      }

      const key = id.toString();
      const data = await this.redisClient.get(key);
      console.log(data);
      
      return task;
    }

  async createTask(dto: createTasksDto) {
    //const id=new Date().toString();
    const Task = this.taskRepository.create(dto);
    //{
    // id,
    // title,
    // description,
    // status: TaskStatus.Open,

     await this.taskRepository.save(Task);
    //});
  await this.redisClient.set('redis_key', JSON.stringify(Task));
    //await this.redisClient.set(Task.id,JSON.stringify(Task) );
    
    // const key1 = Task.id;
      const redis_task = JSON.stringify(Task);
     
     const key = Task.id.toString();
     
      this.redisClient.set(key, redis_task);

    console.log("data saved to redis", Task);
    return Task;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    const key = id.toString();
    await this.redisClient.del(key);
    console.log("Data is deleted from redis");

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

   // await this.redisClient.del()
  }

  //   async updateTaskStatus(id: string, taskStatus: TaskStatus): Promise<Task> {
  //     const task = await this.getTaskById(id);
  //     task.status = taskStatus;
  //     return this.taskRepository.save(task);
  //   }

  async updateTaskStatus(id:string, title : string, description : string) {
    const task = await this.getTaskById(id)
    //task.status = taskStatus
    task.title = title;
    task.description = description;
    //dto.title = title
    await this.taskRepository.save(task);
    
    const key = id.toString();
    await this.redisClient.set(key, JSON.stringify(task));

    return task
}


}