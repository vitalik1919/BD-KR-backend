import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import {Category} from "../../categories/entities/category.entity";
import {Trainer} from "../../trainers/entities/trainer.entity";
import {Customer} from "../../customers/entities/customer.entity";

@Entity({name: 'group_classes'})
export class GroupClass {

    @PrimaryGeneratedColumn()
    id : number

    @Column('varchar', {nullable: false})
    type : number

    @Column('decimal', {nullable: false})
    price : number

    @Column('varchar', {nullable: false})
    day : string

    @Column('time', {nullable: false})
    start_time : string

    @ManyToOne(() => Trainer, trainer => trainer.groupClasses)
    trainer: Trainer;
    @OneToMany(() => Customer, customer => customer.groupClass)
    customers: Customer[];

}
