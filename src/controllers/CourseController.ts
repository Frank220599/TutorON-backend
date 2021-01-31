import {Response, Request} from "express";
import {
    Get,
    JsonController,
    Param,
    Req,
    Res,
    NotFoundError,
    Post,
    Body,
    Authorized,
    Delete,
} from "routing-controllers"
import {getCustomRepository} from "typeorm";
import {UserRoles} from "../constants/enums";
import CourseRepository from "../repositories/CourseRepository";
import CourseDTO from "../dto/CourseDTO";
import LessonRepository from "../repositories/LessonRepository";


@JsonController("/courses")
export class CourseController {

    private readonly repository = getCustomRepository(CourseRepository);
    private readonly lessonRepository = getCustomRepository(LessonRepository);

    @Get("/")
    public async getAll(@Res() res: Response, @Req() req: Request): Promise<any> {
        try {
            const data = await this.repository.findAndCount(req);

            return await res.json(data)

        } catch (error) {
            return res.json({error})
        }
    }

    @Get("/:id/lessons")
    public async getCourseLesson(@Param('id') id: number, @Res() res: Response, @Req() req: Request): Promise<any> {
        try {
            const data = await this.lessonRepository.findAndCount(req, {
                where: {
                    course: id
                }
            });
            return await res.json(data)
        } catch (error) {
            return res.json({error})
        }
    }

    @Get("/:id")
    public async getOne(@Param('id') id: number, @Res() res: Response): Promise<any> {
        try {
            const data = await this.repository.findById(id);
            if (!data) {
                res.statusCode = 404;
                throw new NotFoundError('course not found');
            }
            return await res.json(data)
        } catch (error) {
            return res.json({error})
        }
    }


    @Authorized([UserRoles.admin])
    @Post("/")
    public async create(
        @Body() newCourse: CourseDTO,
        @Res() res: Response,
        @Req() req: any,
    ): Promise<any> {
        try {
            const data = await this.repository.create(newCourse);
            return await res.json(data)
        } catch (error) {
            return res.json({error: error.message})
        }
    }


    // @Authorized()
    // @Delete("/:id")
    // public async delete(
    //     @CurrentUser() user: User,
    //     @Param("id") id: number,
    //     @Res() res: Response
    // ): Promise<any> {
    //     try {
    //         const isDeleted = await this.repository.delete(id);
    //
    //         if (isDeleted) {
    //             return await res.json({
    //                 id,
    //                 message: 'Announcement deleted successfully.'
    //             })
    //         }
    //
    //     } catch (error) {
    //         return res.json({error: error.message})
    //     }
    // }
}

