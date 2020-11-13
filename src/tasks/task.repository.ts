import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { stat } from "fs";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
        const {status, search} = filterDto;
        const query = this.createQueryBuilder('task');

        if (status){
            query.andWhere('task.status = :status', {status})
        }
        if (search){
            console.log(search)
            query.andWhere('(task.title LIKE :search  OR task.description LIKE :search)',
             {search: `%${search}%`} /**for partil look */)
        }
        

        const tasks =await query.getMany();
        return tasks;
    }

}