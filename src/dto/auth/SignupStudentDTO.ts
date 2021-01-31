import {IsEnum, IsNotEmpty} from "class-validator";
import {LanguageLevel} from "../../constants/enums";
import UserDTO from "../UserDTO";

class SignupStudentDTO extends UserDTO {

    @IsNotEmpty()
    aim: string;

    @IsNotEmpty()
    about: string;

    @IsNotEmpty()
    @IsEnum(LanguageLevel)
    languageLevel: LanguageLevel;

}

export default SignupStudentDTO;