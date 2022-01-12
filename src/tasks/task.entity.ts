import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";

@Entity()
export class Task{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @ManyToOne(type => User, type => type.tasks, { eager: false })
    @Exclude({ toPlainOnly: true })
    user: User
}