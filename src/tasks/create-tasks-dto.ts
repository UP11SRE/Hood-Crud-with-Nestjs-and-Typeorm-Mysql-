import { IsNotEmpty, IsString } from "class-validator"

export class createTasksDto{
    @IsString()
    @IsNotEmpty()
    title : string
    @IsString()
    @IsNotEmpty()
    description : string
}