import {EntityRepository} from "typeorm"
import CrudRepository from "../utils/CrudRepository";
import {Form} from "../database/entities";

@EntityRepository(Form)
class FormRepository extends CrudRepository<Form, any> {

}


export default FormRepository;
