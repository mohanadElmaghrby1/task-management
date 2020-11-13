import { Injectable, NotFoundException } from '@nestjs/common';
import { from } from 'rxjs';
import { CreateTaskDto } from './dto/create-task.dto';
import { threadId } from 'worker_threads';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository) {

    }

    async getAllTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return await this.taskRepository.getTasks(filterDto);
    }

    // getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
    //     const {status , search} = filterDto;

    //     let tasks = this.getAllTasks();
    //     if (status){
    //         tasks= tasks.filter( task=> task.status === status);
    //     }
    //     if (search){
    //         tasks = tasks.filter( task=> 
    //             task.description.includes(search) ||
    //             task.title.includes(search),
    //         );
    //     }
    //     return tasks;
    // }


    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto);
    }
    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`task with id ${id} not found`)
        }
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto) {
        const { title, description } = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await this.taskRepository.save(task);
        return task;

    }

    async deleteTask(id: number) {
        const result =await this.taskRepository.delete(id);
        if (result.affected === 0){
            throw new NotFoundException(`task with id ${id} not found`)
        }
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await this.taskRepository.save(task);
        return task;
    }
}
