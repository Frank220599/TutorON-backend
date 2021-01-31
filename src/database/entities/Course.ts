import {Entity, Column, OneToMany, ManyToMany} from "typeorm";
import {BaseEntity} from "./core/BaseEntity";
import Student from "./Student";
import Teacher from "./Teacher";
import Lesson from "./Lesson";


@Entity({name: 'courses'})
class Course extends BaseEntity {

    @Column()
    public title: string;

    @Column()
    public description: string;

    @OneToMany(() => Student, student => student.course)
    students: Student[]

    @ManyToMany(() => Teacher, teacher => teacher.courses)
    teachers: Teacher[]

    @OneToMany(() => Lesson, lesson => lesson.course)
    lessons: Lesson[]

}


export default Course;
