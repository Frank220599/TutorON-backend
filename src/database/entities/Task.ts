import {Entity, Column, ManyToOne} from "typeorm";
import {BaseEntity} from "./core/BaseEntity";
import {TaskTypes} from "../../constants/enums";
import Lesson from "./Lesson";


@Entity({name: 'tasks'})
class Task extends BaseEntity {

    @Column()
    public title: string;

    @Column()
    public description: string;

    @Column({type: "enum", enum: TaskTypes})
    public type: TaskTypes;

    @Column({type: "simple-array", nullable: false})
    public answers: string;

    @Column({type: "simple-array", nullable: false})
    public right_answers: string;

    @ManyToOne(() => Lesson, lesson => lesson.tasks)
    lesson: Lesson;

}


export default Task;
