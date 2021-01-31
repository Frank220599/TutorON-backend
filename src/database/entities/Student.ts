import {Entity, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn, ManyToOne, Column, ManyToMany} from "typeorm";
import User from "./User";
import Teacher from "./Teacher";
import {LanguageLevel} from "../../constants/enums";
import Course from "./Course";
import Answer from "./Answers";


@Entity({name: 'students'})
class Student extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public aim: string

    @Column({type: "enum", enum: LanguageLevel})
    public languageLevel: LanguageLevel;

    @OneToOne(() => User)
    @JoinColumn()
    public user: User;

    @ManyToOne(() => Teacher, teacher => teacher.students)
    public teacher: Teacher[]

    @ManyToOne(() => Course, course => course.students)
    course: Course[]

}


export default Student;
