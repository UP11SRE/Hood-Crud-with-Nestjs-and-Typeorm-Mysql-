import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { get } from 'http';
//import { Task } from './task.module';
//import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
//import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.module';
import { Tasks } from 'src/tasks.entity';
import { createTasksDto } from './create-tasks-dto';

// @Controller('tasks')
// export class TasksController {
//     constructor(private taskService : TasksService){}

//        @Get()
//         getalltask() : Task[]{
//          return this.taskService.getalltask()
//         }

//         @Get('/:id')
//         getTaskById(@Param('id') id:string){
//             return this.taskService.getTaskById(id);
//         }
         
//         @Post()
//         createTask(
//             @Body('title') title: string,
//             @Body('description') description: string,
//           ): Task {
//             return this.taskService.createTask(title,description);
//         }


//         @Delete('/:id')
//         deleteTask(@Param('id') id:string){
//             this.taskService.deleteTask({ id })
//             return 'task ${id} is deleted'
//         }

//         @Patch('/:id')
//         updateTaskStatus(@Param('id') id:string, @Body('status') status : TaskStatus){
//             return this.taskService.updateTaskStatus(id,status)

//         }

  //  }


  @Controller('/tasks')
  export class TasksController {
    constructor(private readonly tasksService: TasksService) {}
  
    @Get()
    async getAllTasks(): Promise<Tasks[]> {
      return this.tasksService.getAllTasks();
    }
  
    //   @Get('/:id')
    //   async getTaskById(@Param('id') id: string): Promise<Task> {
    //     return this.tasksService.getTaskById(id);
    //   }
  
    @Post()
     createTask( @Body() dto : createTasksDto) {
      
         
      
      return  this.tasksService.createTask(dto);
    }
  
    @Delete('/:id')
    async deleteTask(@Param('id') id: string): Promise<void> {
      await this.tasksService.deleteTask(id);
    }
  

  // @Patch('/:id/status')
  // async updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status') status: TaskStatus,
  // ): Promise<Task> {
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
}