import {Entity, Column, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import {BaseEntity} from "./core/BaseEntity";
import Task from "./Task";
import User from "./User";


@Entity({name: 'answers'})
class Answer extends BaseEntity {

    @Column("simple-array")
    public answers;

    @Column()
    public mark: number;

    @ManyToOne(() => Task, task => task.answers)
    public task: Task;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

}


export default Answer;
