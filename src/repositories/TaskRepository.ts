import {EntityRepository} from "typeorm"
import CrudRepository from "../utils/CrudRepository";
import Task from "../database/entities/Task";
import TaskDTO from "../dto/TaskDTO";

@EntityRepository(Task)
class TaskRepository extends CrudRepository<Task, TaskDTO> {

}


export default TaskRepository
