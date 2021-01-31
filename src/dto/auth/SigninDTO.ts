import {Length, IsNotEmpty} from "class-validator";

class SigninDTO {

    @IsNotEmpty()
    phone: string;

    @Length(6, 20)
    password: string;

}

export default SigninDTO;
