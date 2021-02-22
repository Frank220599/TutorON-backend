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
    UploadedFile,
} from "routing-controllers"
import {getCustomRepository} from "typeorm";
import FormConstructorRepository from "../repositories/FormConstructorRepository";
import LessonDTO from "../dto/LessonDTO";
import upload from "../middlewares/upload";

@JsonController("/lessons")
export class FormConstructorController {

    private readonly repository = getCustomRepository(FormConstructorRepository);

    @Get("/")
    public async getAll(@Res() res: Response, @Req() req: Request): Promise<any> {
        try {
            const data = await this.repository.findAndCount(req);

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

