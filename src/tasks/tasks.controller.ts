import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) {

    }

    @Get()
    public getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto/*this contans queryparam as object*/): Promise<Task[]> {
        return this.tasksService.getAllTasks(filterDto);
    }

    @Get("/:id")
    findTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Delete("/:id")
    deleteTaskById(@Param('id',ParseIntPipe) id: number) {
        return this.tasksService.deleteTask(id);
    }

    @Patch("/:id")
    updateTaskByStatus(
        @Param('id',ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) taskStatus: TaskStatus) {
        return this.tasksService.updateTaskStatus(id, taskStatus);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto):Promise<Task> {
        console.log(createTaskDto)
        return this.tasksService.createTask(createTaskDto);
    }
}
