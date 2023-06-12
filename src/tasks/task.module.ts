import { title } from "process"
import { Module } from '@nestjs/common';
//import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from "@nestjs/typeorm";


export interface  Task{
    id : string,
    title : string,
    description : string,
    status : TaskStatus
}

export enum TaskStatus {
    Done = 'Done',
    In_Progress = 'In Progress',
    Open = 'Open'
}

