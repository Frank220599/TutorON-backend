import {IsNotEmpty, IsEnum, IsArray} from "class-validator";
import {TaskTypes} from "../constants/enums";
import {Answers, RightAnswers} from "../constants/types";

class TaskDTO {
    @IsNotEmpty()
    public title: string;

    @IsNotEmpty()
    public description: string;

    @IsNotEmpty()
    @IsEnum(TaskTypes)
    public type: TaskTypes;

    @IsNotEmpty()
    public answers: Answers[];

    @IsNotEmpty()
    public right_answers: RightAnswers[];

    @IsNotEmpty()
    lesson: number
}

export default TaskDTO;