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
    Authorized, UploadedFile,
} from "routing-controllers"
import {getCustomRepository} from "typeorm";
import {UserRoles} from "../constants/enums";
import LessonRepository from "../repositories/LessonRepository";
import LessonDTO from "../dto/LessonDTO";
import upload from "../middlewares/upload";
import TaskRepository from "../repositories/TaskRepository";
import {stringToSimpleJson} from "../utils/parser";

@JsonController("/lessons")
export class LessonController {

    private readonly repository = getCustomRepository(LessonRepository);
    private readonly taskRepository = getCustomRepository(TaskRepository);

    @Get("/")
    public async getAll(@Res() res: Response, @Req() req: Request): Promise<any> {
        try {
            const data = await this.repository.findAndCount(req);

            return await res.json(data)

        } catch (error) {
            return res.json({error})
        }
    }

    @Get("/:id/tasks")
    public async getLessonTasks(@Param('id') id: number, @Res() res: Response, @Req() req: Request): Promise<any> {
        try {
            const data = await this.taskRepository.findAndCount(req, {
                where: {
                    lesson: id
                }
            });

            const normalized = data.data.map(item => ({
                ...item,
                answers: stringToSimpleJson(item.answers),
                right_answers: stringToSimpleJson(item.right_answers)
            }));

            return await res.json({
                ...data,
                data: normalized,
            })

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
        @Body() newLesson: LessonDTO,
        @UploadedFile('file', {
            required: true,
            options: upload('uploads/documents', ['application/pdf']),
        }) file: any,
        @Res() res: Response,
        @Req() req: any,
    ): Promise<any> {
        try {
            const data = await this.repository.create({
                ...newLesson,
                file: file?.path
            });
            return await res.json(data)
        } catch (error) {
            if (res.statusCode === 200) res.statusCode = 400
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

