import { IsNotEmpty } from "class-validator";

export class AddTaskDTO{

    @IsNotEmpty()
    taskBody: string
}

export class updateTaskDTO{
    @IsNotEmpty()
    taskBody: string
}