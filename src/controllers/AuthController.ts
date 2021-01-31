import {
    Body,
    JsonController,
    Post,
    Res,
    Authorized,
    CurrentUser,
    Get,
    Req,
    HttpError,
    UseBefore, UploadedFile
} from "routing-controllers";
import {Response, Request} from "express";
import {getCustomRepository} from "typeorm"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

import UserRepository from "../repositories/UserRepository";
import User from "../database/entities/User";
import SigninDTO from "../dto/auth/SigninDTO";
import Teacher from "../database/entities/Teacher";
import Student from "../database/entities/Student";
import SignupStudentDTO from "../dto/auth/SignupStudentDTO";
import SignupTeacherDTO from "../dto/auth/SignupTeacherDTO";
import {UserRoles} from "../constants/enums";
import multer from "multer";
import upload from "../middlewares/upload";

@JsonController('/auth')
export class AuthController {
    private readonly repository = getCustomRepository(UserRepository);

    public async checkAndCreateUser(newUser, res: Response) {
        const isUserExist = await this.repository.findByPhone(newUser.phone);

        if (isUserExist) {
            res.statusCode = 409;
            throw new HttpError(409, 'This user already exist!')
        }
        const hashedPassword = await bcrypt.hash(newUser.password, 12);

        return await this.repository.create({
            ...newUser,
            password: hashedPassword,
        });

    }

    @Authorized([UserRoles.admin])
    @Post("/signup-teacher")
    public async SignupTeacher(
        @Body() newUser: SignupTeacherDTO,
        @UploadedFile('photo', {options: upload('uploads/images')}) photo: any,
        @Res() res: Response
    ): Promise<any> {
        try {
            const user = await this.checkAndCreateUser({
                ...newUser,
                photo: photo?.path,
                role: UserRoles.teacher
            }, res)

            const teacher = new Teacher();
            teacher.user = user;
            await teacher.save();

            return await res.status(201).json({user})

        } catch (error) {
            return res.json({error})
        }
    }

    @Authorized([UserRoles.admin])
    @Post("/signup-student")
    public async SignupStudent(
        @Body() newUser: SignupStudentDTO,
        @UploadedFile('photo', {options: upload('uploads/images')}) photo: any,
        @Res() res: Response
    ): Promise<any> {
        try {

            const user = await this.checkAndCreateUser({
                ...newUser,
                photo: photo?.path,
                role: UserRoles.student
            }, res)

            const student = new Student();
            student.user = user;
            student.aim = newUser.aim;
            await student.save();

            return await res.status(201).json({user})

        } catch (error) {
            return res.json({error})
        }
    }

    @UseBefore(multer().none())
    @Post('/signin')
    public async Signin(@Body() userBody: SigninDTO, @Res() res: Response): Promise<any> {
        try {
            const user = await this.repository.getUserWithPassword(userBody.phone);

            if (!user) {
                res.statusCode = 409;
                throw new HttpError(409, 'Incorrect Login or password!')
            }

            const isEqual = await bcrypt.compare(userBody.password, user.password);
            if (!isEqual) {
                res.statusCode = 401;
                throw new HttpError(401, 'Incorrect Login or password!')
            }
            const token = await jwt.sign({
                phone: user.phone,
                userId: user.id,
            }, 'secret', {expiresIn: '1000h'});
            return await res.json({
                token,
                user,
            })
        } catch (error) {
            return res.json({error})
        }
    }

    @Authorized()
    @Get('/authenticate')
    public async Authenticate(@CurrentUser() user: User, @Res() res: Response, @Req() req: Request): Promise<any> {
        try {
            return await res.json({
                data: user
            })
        } catch (error) {
            return res.json({error})
        }
    }
}


