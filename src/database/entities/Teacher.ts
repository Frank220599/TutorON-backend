import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
    OneToMany
} from "typeorm";
import User from "./User";
import Student from "./Student";
import Course from "./Course";


@Entity({name: 'teachers'} )
class Teacher extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(() => User)
    @JoinColumn()
    public user: User;

    @OneToMany(() => Student, student => student.teacher)
    public students: Student[]

    @ManyToMany(() => Course)
    @JoinTable({
        name: 'course_teachers',
        joinColumn: {
            name: 'teacherId'
        },
        inverseJoinColumn: {
            name: 'courseId'
        }
    })
    courses: Course[]

}


export default Teacher;
