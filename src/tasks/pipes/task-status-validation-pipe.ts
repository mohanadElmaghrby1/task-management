import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {

    readonly allowedStatus = [
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
        TaskStatus.OPEN,
    ];

    transform(value: any) {
        value = value.toUpperCase();
        if (! this.isStatusValid(value)){
            throw new BadRequestException(`${value} is an invalid staus`)
        }
        return value;
    }

    private isStatusValid(status: any): boolean {
        const indx= this.allowedStatus.indexOf(status);
        return indx !== -1;
    }
}