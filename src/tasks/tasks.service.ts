import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getAllTasks(): Task[]{
        return this.tasks
    }

    getTasksWithFilter(filter: GetTaskFilterDto): Task[]{
        const { status, search } = filter
        let tasks = this.getAllTasks()
        if(status) tasks = tasks.filter(task => task.status === status)

        if(search) tasks = tasks.filter(task => {
            if (task.description.includes(search)) return true
            if (task.title.includes(search)) return true

            return false
        })

        return tasks
    }

    getTaskById(id: string): Task{
        const task =  this.tasks.find((task: Task) => task.id === id)

        if(!task) throw new NotFoundException(`Task with id ${id} dosen't exists!`)

        return task
    }

    deleteTask(id: string){
        this.getTaskById(id)
        
        this.tasks = this.tasks.filter((task: Task) => task.id !== id)
    }

    updateTaskStatus(status: TaskStatus, id: string): Task{
        const updatedTask = this.getTaskById(id)
        updatedTask.status = status

        return updatedTask
    }

    createTask(createTaskDto: CreateTaskDto): Task{
        const { title, description } = createTaskDto
        
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task)
        return task
    }
}
