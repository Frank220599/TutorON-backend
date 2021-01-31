import {EntityRepository} from "typeorm"
import CrudRepository from "../utils/CrudRepository";
import Answer from "../database/entities/Answers";
import AnswerDTO from "../dto/AnswerDTO";

@EntityRepository(Answer)
class AnswerRepository extends CrudRepository<Answer, AnswerDTO> {
}


export default AnswerRepository;
