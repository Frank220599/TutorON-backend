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
    Delete, CurrentUser, UploadedFiles,
} from "routing-controllers"
import {getCustomRepository} from "typeorm";
import TaskRepository from "../repositories/TaskRepository";
import TaskDTO from "../dto/TaskDTO";
import Task from "../database/entities/Task";
import {stringToSimpleJson} from "../utils/parser";
import {UserRoles} from "../constants/enums";
import AnswerRepository from "../repositories/AnswerRepository";
import AnswerDTO from "../dto/AnswerDTO";
import User from "../database/entities/User";


@JsonController("/tasks")
export class TaskController {

    private readonly repository = getCustomRepository(TaskRepository);
    private readonly answerRepository = getCustomRepository(AnswerRepository);

    @Get("/")
    public async getAll(@Res() res: Response, @Req() req: Request): Promise<any> {
        try {
            const data: { data: Task[]; _metadata: object } = await this.repository.findAndCount(req);

            const normalized = data.data.map(item => ({
                ...item,
                answers: stringToSimpleJson(item.answers),
                right_answers: stringToSimpleJson(item.right_answers)
            }));

            await res.json({...data, data: normalized})

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
                throw new NotFoundError('task not found');
            }
            return await res.json({
                ...data,
                answers: stringToSimpleJson(data.answers),
                right_answers: stringToSimpleJson(data.right_answers)
            })
        } catch (error) {
            return res.json({error})
        }
    }

    @Authorized([UserRoles.admin])
    @Post("/")
    public async create(
        @Body() newTask: TaskDTO,
        @UploadedFiles('files') files: any,
        @Res() res: Response,
        @Req() req: any,
    ): Promise<any> {
        try {
            const data = await this.repository.create(newTask);
            return await res.json(data)
        } catch (error) {
            return res.json({error})
        }
    }

    @Authorized()
    @Post("/:id/answer")
    public async answerTask(
        @CurrentUser() user: User,
        @Param('id') id: number,
        @Body() newAnswer: AnswerDTO,
        @Res() res: Response
    ): Promise<any> {
        try {

            const task = await this.repository.findById(id);

            if (!task) {
                res.statusCode = 404;
                throw new NotFoundError('task not found');
            }

            let answers = [];
            const userAnswers = stringToSimpleJson(newAnswer.answers as string);
            const taskAnswers = stringToSimpleJson(task.answers);
            const taskRightAnswers = stringToSimpleJson(task.right_answers);

            if (!userAnswers) {
                res.statusCode = 400;
                throw new Error('Format of answers  wrong!');
            }

            taskRightAnswers.map((answer, index) => {
                answers.push({
                    answer: taskAnswers[index][userAnswers[index]],
                    isCorrect: !!answer[userAnswers[index]]
                })
            })

            const mark = answers.filter(answer => answer.isCorrect).length;

            const data = await this.answerRepository.create({
                answers: JSON.stringify(answers),
                mark,
                task: id,
                user: user.id
            });

            return await res.json(data)

        } catch (error) {
            return res.json({error})
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

