import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { type } from "os";
import { User } from "src/auth/user.entity";


@Entity()
export class Task extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus

    @ManyToOne(type => User,
        user => user.tasks, {eager: false})
    user: User;

}