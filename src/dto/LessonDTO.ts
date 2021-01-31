import {IsInt, IsOptional, Length} from "class-validator";
import {Type} from "class-transformer";

class LessonDTO {

    @Length(10, 40)
    title: string;

    @Length(10)
    description: string;

    @Type(() => Number)
    @IsInt()
    course: number;

    @IsOptional()
    file: string;

}

export default LessonDTO;
