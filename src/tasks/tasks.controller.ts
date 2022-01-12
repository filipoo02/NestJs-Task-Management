import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { GetUser } from '../auth/get-user.decorator'
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getTasks(
            @Query() 
            filterDto: GetTaskFilterDto,
            @GetUser() 
            user: User
        ): Promise<Task[]>{
        return this.tasksService.getTasks(filterDto, user)
    }

    @Get('/:id')
    getTaskById(
        @Param('id') id: string,
        @GetUser() user: User): Promise<Task>{
        return this.tasksService.getTaskById(id, user)
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): Promise<void>{
        return this.tasksService.deleteTask(id)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Body() updateTaskStatusDto: UpdateTaskStatusDto, 
        @Param('id') id: string, 
        @GetUser() user: User): Promise<Task>{
            
        const { status } = updateTaskStatusDto
        return this.tasksService.updateTaskStatus(status, id, user)
    }

    @Post()
    createTask(
        @Body() 
        createTaskDto: CreateTaskDto,
        @GetUser() user: User): Promise<Task>{
        return this.tasksService.createTask(createTaskDto, user)
    }
}
