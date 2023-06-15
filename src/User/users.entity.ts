import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
//import { TaskStatus } from './task-status.enum';

@Entity({name : 'Users'})
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique : true})
  email: string;

  @Exclude()
  @Column()
  password: string;
}