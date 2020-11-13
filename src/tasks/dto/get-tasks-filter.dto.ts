import { IsOptional, IsNotEmpty, IsIn } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class GetTasksFilterDto{
    @IsOptional() /**Checks if given value is empty (=== null, === undefined) and if so,
     ignores all the validators on the property. */
     @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
    status: TaskStatus;
    
    @IsOptional()
    @IsNotEmpty()
    search: string;
}