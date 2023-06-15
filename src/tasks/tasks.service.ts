import { Inject, Injectable, NotFoundException } from '@nestjs/common';
//import { TaskStatus } from './task.module';
//import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tasks } from 'src/tasks.entity';
import { createTasksDto } from './create-tasks-dto';
import Redis from 'ioredis';
import { title } from 'process';
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
  //  const redisData = await this.redisClient.get('redis_key');
  //   if (redisData) {
  //     console.log({
  //       redisData,
  //     })
  //     return JSON.parse(redisData);

  //  }


    // return this.taskRepository.find();

    

    

    //const leng = JSON.parse(length);

    const db_data =  await this.taskRepository.find()

    let size = db_data.length;

    let length = await this.redisClient.llen('new_list');
    console.log(length);
    console.log(size);

    size = size * 2;

    if( length === size){


      const redis_data = await this.redisClient.lrange('new_list', 0, -1);

      const parsed_data =  redis_data.map(redis_data => JSON.parse(redis_data) as Tasks);
 
      console.log("data is from redis", redis_data);

      return parsed_data;
 
    }
   
    this.redisClient.ltrim('new_list', -1, 0);

    this.redisClient.rpush('new_list', ...db_data.map(task => JSON.stringify(task)));

    //console.log(db_data);
    //console.log(redis_data);
    return db_data;
    
    
    
   

    //console.log("hyyyyyyyyyy",db_deta);

    //await this.redisClient.set('redis_key',JSON.stringify(db_deta));
    
     //return db_deta;

    
  }

    async getTaskById(id: string): Promise<any> {
      const task = await this.taskRepository.findOne({ where: { id: Number(id) } });
      // await this.redisClient.set('New_key', JSON.stringify(task));

      if (!task) {
        throw new NotFoundException(`Task with ID "${id}" not found`);
      }

      //const key = id.toString();
      //const data = await this.redisClient.get(key);
     // console.log(data);
      
     const all_index = await this.redisClient.lrange('new_lists',0,-1)

     const index = all_index.find(all_index=>JSON.parse(all_index).id === task) 


     console.log(index);

     const data1 = await this.redisClient.lindex('new_list',index);

     console.log(data1);

      return task;
    }

  async createTask(dto: createTasksDto) {
    //const id=new Date().toString();
    //const {title,description} = dto;
    
    const Task = this.taskRepository.create(dto);
    //{
    // id,
    // title,
    // description,
    // status: TaskStatus.Open,

     await this.taskRepository.save(Task);
    //});
  //await this.redisClient.set('redis_key', JSON.stringify(Task));
    //await this.redisClient.set(Task.id,JSON.stringify(Task) );
    
    // const key1 = Task.id;
      const redis_task = JSON.stringify(Task);
     
     const key = Task.id.toString();
     
      //this.redisClient.hset('new_hash',key, redis_task);
      await this.redisClient.lpush('new_list',key, redis_task);
      //await this.redisClient.ltrim('new_list', 0, 4);

     //const j = this.redisClient.zcard('new_set');
    console.log("data saved to redis", Task);
    return Task;
  }

  async deleteTask(id: string) {
    const result = await this.taskRepository.delete(id);
    const key = id.toString();
    //await this.redisClient.hdel('new_hash',key);

   //const all_index = this.redisClient.lrange('new_list', 0,-1);
   
   //const index =  (await all_index).find(all_index => JSON.parse(all_index).id === result)

   this.redisClient.lrem('new_list', 1, key);

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

    //const {title, description} = body
    
    //const all_index = await this.redisClient.lrange('new_list', 0, -1);

    //const index = all_index.find(all_index=>JSON.parse(all_index).id === task);

    const key = id.toString();

    const test = await this.redisClient.lrem('new_list', 1, key);

    console.log("data is deleted" , test);


    
    await this.redisClient.lpush('new_list', key, JSON.stringify(task));

    return task
}


}