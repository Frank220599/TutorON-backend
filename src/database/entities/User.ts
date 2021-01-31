import {Entity, Column, OneToMany, ManyToOne, OneToOne, ManyToMany} from "typeorm";
import {BaseEntity} from "./core/BaseEntity";
import {Permissions, UserRoles} from "../../constants/enums";
import Student from "./Student";
import Teacher from "./Teacher";
import Answer from "./Answers";


@Entity({name: 'users'})
class User extends BaseEntity {

    @Column()
    public email: string;

    @Column()
    public full_name: string;

    @Column()
    public about: string

    @Column({nullable: true})
    public photo: string;

    @Column({type: "double", unique: true})
    public phone: number;

    @Column({select: false})
    public password: string;

    @Column()
    public birthday: string;

    @Column({type: 'enum', enum: UserRoles})
    public role: string;

    @Column({type: 'enum', enum: Permissions, default: Permissions.active})
    public status: string;

    @OneToOne(() => Student, student => student.user)
    student: Student

    @OneToOne(() => Teacher, teacher => teacher.user)
    teacher: Teacher

    @ManyToMany(() => Answer, answer => answer.user)
    answers: Answer[]

}


export default User;
