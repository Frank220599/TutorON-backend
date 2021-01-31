import {PrimaryGeneratedColumn, Column, BaseEntity as TypeOrmBaseEntity} from "typeorm";
import {TimeStamp} from "./TimeStamp";

export abstract class BaseEntity extends TypeOrmBaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column(type => TimeStamp, {prefix: ''})
    public timestamp: TimeStamp;

}

