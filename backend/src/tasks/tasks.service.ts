import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { stringify } from 'querystring';
import { PrismaService } from 'src/prisma.service';
import { AddTaskDTO } from './task-dto';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService){}

    async addTask(addTaskDTO: AddTaskDTO){
        try {
            return await this.prisma.task.create({data: addTaskDTO}) //add where clause later for userid
        } catch (error) {
            throw new InternalServerErrorException('Failed add task')
        }
    }

    async getAllTasks(){
        try {
            return await this.prisma.task.findMany() 
        } catch (error) {
            throw new InternalServerErrorException('Failed getting all tasks')
        }
    }

    async deleteTask(id: number){
        try {
            return await this.prisma.task.delete({where: {id: id}});
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Failed getting all task')
        }
    }

    async updateTask(id: number, updateDTO: {taskBody: string}){
        try {
            return await this.prisma.task.update({
                data: updateDTO,
                where: {
                    id: id
                }
            });
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Failed updating task')
        }
    }
}
