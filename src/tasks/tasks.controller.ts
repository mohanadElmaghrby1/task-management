import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decerator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

    constructor(private tasksService: TasksService) {

    }

    @Get()
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard())
    public getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto/*this contans queryparam as object*/): Promise<Task[]> {
        return this.tasksService.getAllTasks(filterDto);
    }

    @Get("/:id")
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard())
    findTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Delete("/:id")
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard())
    deleteTaskById(@Param('id',ParseIntPipe) id: number) {
        return this.tasksService.deleteTask(id);
    }

    @Patch("/:id")
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard())
    updateTaskByStatus(
        @Param('id',ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) taskStatus: TaskStatus) {
        return this.tasksService.updateTaskStatus(id, taskStatus);
    }

    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard())
    createTask(@GetUser() user : User ,@Body() createTaskDto: CreateTaskDto):Promise<Task> {
        return this.tasksService.createTask(createTaskDto,user);
    }
}
