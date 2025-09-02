import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AddTaskDTO, updateTaskDTO } from './task-dto';
import { PrismaService } from 'src/prisma.service';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(
        private task: TasksService
    ){}

    @Post('/addTask')
    async addTask(
        @Body()
        addTaskDTO: AddTaskDTO
    ){  
        return await this.task.addTask(addTaskDTO);
    }

    @Get()
    async getAllTasks(){
        return await this.task.getAllTasks();
    }

    @Delete('/deleteTask/:id')
    async getAllTask(
        @Param('id', ParseIntPipe) taskID: number
    ){
        return await this.task.deleteTask(taskID);
    }

    @Put('updateTask/:id')
    async updateTask(
        @Param('id', ParseIntPipe) id: number,
        @Body()
        updateDTO: updateTaskDTO
    ) {
        return this.task.updateTask(id, updateDTO);
    }
}
