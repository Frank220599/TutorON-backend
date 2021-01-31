import {IsNotEmpty, IsJSON} from "class-validator";
import {Answers} from "../constants/types";
import {Type} from "class-transformer";

class AnswerDTO {

    @IsNotEmpty()
    @IsJSON()
    public answers: Answers;


}

export default AnswerDTO;