import {EntityRepository} from "typeorm"
import CrudRepository from "../utils/CrudRepository";
import Course from "../database/entities/Course";
import CourseDTO from "../dto/CourseDTO";

@EntityRepository(Course)
class CourseRepository extends CrudRepository<Course, CourseDTO> {

}


export default CourseRepository
