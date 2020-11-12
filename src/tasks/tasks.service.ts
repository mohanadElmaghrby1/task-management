import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
// import * as uuid from 'uuid/v1';
import { from } from 'rxjs';
import { CreateTaskDto } from './dto/create-task.dto';
import { threadId } from 'worker_threads';
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []
    count = 0;

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilter(filterDto: getTasksFilterDto): Task[] {
        const {status , search} = filterDto;

        let tasks = this.getAllTasks();
        if (status){
            tasks= tasks.filter( task=> task.status === status);
        }
        if (search){
            tasks = tasks.filter( task=> 
                task.description.includes(search) ||
                task.title.includes(search),
            );
        }
        return tasks;
    }

    getTaskById(id: string) {
        const found= this.tasks.find(task => task.id === id)
        if (!found){
            throw new NotFoundException(`task with id ${id} not found`)
        }
        return found;
    }

    createTask(createTaskDto: CreateTaskDto) {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: ++this.count + '',
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string){
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task=> task.id !== found.id);
    }

    updateTaskStatus(id: string, status: TaskStatus): Task{
        const task =this.getTaskById(id);
        if (task)
        task.status=status;
        return task;
    }
}
