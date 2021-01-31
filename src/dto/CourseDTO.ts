import {Length} from "class-validator";

class CourseDTO {

    @Length(10, 40)
    title: string;

    @Length(10)
    description: string;


}

export default CourseDTO;
