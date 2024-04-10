import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import {GroupClass} from "../../group_classes/entities/group_class.entity";
import {TrainerClass} from "../../trainer_classes/entities/trainer_class.entity";

@Entity({name: 'trainers'})
export class Trainer {

    @PrimaryGeneratedColumn()
    id : number

    @Column('varchar', {nullable: false})
    first_name : string

    @Column('varchar', {nullable: false})
    last_name : string

    @Column('decimal', {nullable: false})
    wage : number

    @Column('varchar', {nullable: false})
    specialty : string

    @OneToMany(() => GroupClass, groupClass => groupClass.trainer)
    groupClasses : GroupClass[];
    @OneToMany(() => TrainerClass, trainerClass => trainerClass.trainer)
    trainerClasses : TrainerClass[];
}
