import { Injectable } from '@nestjs/common';
import { Tasks } from './task.module';

@Injectable()
export class TasksService {
    private tasks: Tasks[] = []

    getAllTasks(){
        return this.tasks
    }
}
