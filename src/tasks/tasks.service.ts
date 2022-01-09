import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    
    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository){}

    getTasks(filterDto: GetTaskFilterDto): Promise<Task[]>{
        return this.taskRepository.getTasks(filterDto)
    }

    async getTaskById(id: string): Promise<Task>{
        const task = await this.taskRepository.findOne(id)

        if(!task) throw new NotFoundException(`Task with id ${id} dosen't exists!`)

        return task
    }

    async deleteTask(id: string){
        const result = await this.taskRepository.delete(id)
        if(result.affected === 0) throw new NotFoundException(`Task with id ${id} dosen't exists!`)
    }

    async updateTaskStatus(status: TaskStatus, id: string): Promise<Task>{
        const updatedTask = await this.getTaskById(id)
        updatedTask.status = status

        await this.taskRepository.save(updatedTask)

        return updatedTask
    }

    createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        return this.taskRepository.createTask(createTaskDto)
    }
}
