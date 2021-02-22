import {Entity, Column, ManyToOne, OneToMany} from "typeorm";
import {BaseEntity} from "./core/BaseEntity";
import {Course, Task} from "../entities";

@Entity({name: 'lessons'})
class Lesson extends BaseEntity {

    @Column()
    public title: string;

    @Column()
    public description: string;

    @Column()
    file: string

    @ManyToOne(() => Course, course => course.lessons, {nullable: false})
    course: Course;

    @OneToMany(() => Task, task => task.lesson)
    tasks: Task[]
}


export default Lesson;
