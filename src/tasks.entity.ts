// users/user.entity.ts
// import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
 //import { TaskStatus } from './tasks/task.module';

// @Entity()
// export class tasks {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   title: string;

//   @Column()
//   description: string;

//   @Column()
//   taskStatus: TaskStatus;
// }

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
//import { TaskStatus } from './task-status.enum';

@Entity({name : 'tasks'})
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  // @Column()
  // status: TaskStatus;
}