import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) {

    }

    @Get()
    public getTasks(@Query(ValidationPipe) filterDto: getTasksFilterDto/*this contans queryparam as object*/): Task[] {
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilter(filterDto);
        }

        console.log(filterDto);
        return this.tasksService.getAllTasks();
    }

    @Get("/:id")
    findTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Delete("/:id")
    deleteTaskById(@Param('id') id: string) {
        return this.tasksService.deleteTask(id);
    }

    @Patch("/:id")
    updateTaskByStatus(
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) taskStatus: TaskStatus) {
        return this.tasksService.updateTaskStatus(id, taskStatus);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto) {
        console.log(createTaskDto)
        return this.tasksService.createTask(createTaskDto);
    }
}
