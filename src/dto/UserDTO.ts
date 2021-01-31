import {IsEmail, IsEnum, IsNotEmpty, IsOptional, Length} from "class-validator";
import {Permissions} from "../constants/enums";

class UserDTO {

    @Length(10, 40)
    full_name: string;

    @Length(12, 12)
    phone: number;

    @IsNotEmpty()
    about: string;

    @IsEmail()
    email: string;

    @Length(6, 20)
    password: string;

    @Length(6, 20)
    birthday: string;

    @IsOptional()
    @IsEnum(Permissions)
    status: Permissions

}

export default UserDTO;
