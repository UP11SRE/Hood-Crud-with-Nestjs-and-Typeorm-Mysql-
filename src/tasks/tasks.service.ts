import { Injectable, NotFoundException } from '@nestjs/common';
import {  TaskStatus } from './task.module';
//import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tasks } from 'src/tasks.entity';
import { createTasksDto } from './create-tasks-dto';
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

// updateTaskStatus(id:string, taskStatus: TaskStatus){
//     let task = this.getTaskById(id)
//     task.status = taskStatus
    
//     return task
// }


  constructor(
    //private taskRepository : TasksRepository,
@InjectRepository(Tasks) private readonly taskRepository: Repository<Tasks>,
  ) {}

  async getAllTasks() {
    return this.taskRepository.find();
    
  }

//   async getTaskById(id: string): Promise<Task> {
//     const task = await this.taskRepository.findOne(id);
//     if (!task) {
//       throw new NotFoundException(`Task with ID "${id}" not found`);
//     }
//     return task;
//   }

  async createTask(dto :createTasksDto){
    //const id=new Date().toString();
    const Task = this.taskRepository.create(dto);
      //{
      // id,
      // title,
      // description,
      // status: TaskStatus.Open,
      
   // });
    return await this.taskRepository.save(Task);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

//   async updateTaskStatus(id: string, taskStatus: TaskStatus): Promise<Task> {
//     const task = await this.getTaskById(id);
//     task.status = taskStatus;
//     return this.taskRepository.save(task);
//   }
}