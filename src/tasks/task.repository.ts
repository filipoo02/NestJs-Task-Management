import { User } from 'src/auth/user.entity'
import { Repository, EntityRepository } from 'typeorm'
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTaskFilterDto } from './dto/get-task-filter.dto'
import { TaskStatus } from './task-status.enum'
import { Task } from './task.entity'

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]>{
        const { status, search } = filterDto
        const query = this.createQueryBuilder('task')

        query.where({ user })

        if(status) query.andWhere('task.status = :status', { status })

        if(search) query.andWhere(
            '(LOWER(task.description) LIKE LOWER(:search) OR LOWER(task.title) LIKE LOWER(:search))',
            { search: `%${search}%` })

        const result = await query.getMany()

        return result
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>{
        const { title, description } = createTaskDto

        const task = this.create({
            status: TaskStatus.OPEN,
            title,
            description,
            user
        })

        await this.save(task)

        return task
    }
}