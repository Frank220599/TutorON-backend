import {EntityRepository} from "typeorm"
import CrudRepository from "../utils/CrudRepository";
import Lesson from "../database/entities/Lesson";
import LessonDTO from "../dto/LessonDTO";

@EntityRepository(Lesson)
class FormConstructorRepository extends CrudRepository<Lesson, LessonDTO> {

}


export default FormConstructorRepository;
