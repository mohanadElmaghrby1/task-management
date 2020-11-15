import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/user.entity';

@Module({
  imports:[
    AuthModule,
    TypeOrmModule.forFeature([TaskRepository,User])
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
