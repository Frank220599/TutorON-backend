import {Response, Request} from "express";
import {
    Get,
    Param,
    Req,
    Res,
    Post,
    Body,
    UploadedFile,
    NotFoundError,
    JsonController,
} from "routing-controllers"
import {getCustomRepository} from "typeorm";
import FormRepository from "../repositories/FormRepository";
import LessonDTO from "../dto/LessonDTO";
import upload from "../middlewares/upload";
import {log} from "util";

@JsonController("/forms")
export class FormController {

    private readonly repository = getCustomRepository(FormRepository);

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
            const normalized = {
                ...data,
                fields: JSON.parse(data.fields)
            }
            return await res.json({data: normalized})
        } catch (error) {
            return res.json({error})
        }
    }

    @Post("/")
    public async create(
        @Body() newLesson: any,
        @UploadedFile('template', {
            required: true,
            options: upload('uploads/documents'),
        }) template: any,
        @Res() res: Response,
        @Req() req: any,
    ): Promise<any> {
        try {
            console.log({newLesson})
            const data = await this.repository.create({...newLesson, template: template?.path});
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

