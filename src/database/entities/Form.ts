import {Entity, Column} from "typeorm";
import {BaseEntity} from "./core/BaseEntity";

@Entity({name: 'forms'})
class Form extends BaseEntity {

    @Column({nullable: true})
    public productId: string;

    @Column({type: "json"})
    public fields: string;

    @Column()
    public template: string;


}


export default Form;
