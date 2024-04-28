import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import {Trainer} from "../../trainers/entities/trainer.entity";
import {Customer} from "../../customers/entities/customer.entity";
import {Transaction} from "../../transactions/entities/transaction.entity";
import {Protocol} from "../../protocols/entities/protocol.entity";

@Entity({name: 'group_classes'})
export class GroupClass {

    @PrimaryGeneratedColumn()
    id : number

    @Column('varchar', {nullable: false})
    type : string

    @Column('decimal', {nullable: false})
    price : number

    @Column('varchar', {nullable: false})
    day : string

    @Column('time', {nullable: false})
    start_time : string

    @Column('int', {nullable: false, default: 10})
    space_left : number

    @ManyToOne(() => Trainer, trainer => trainer.groupClasses)
    trainer: Trainer;
    @OneToMany(() => Customer, customer => customer.groupClass)
    customers: Customer[];
    @OneToMany(() => Transaction, transaction => transaction.groupClass)
    transactions : Transaction[];
    @OneToMany(() => Protocol, protocol => protocol.groupClass)
    protocols : Protocol[];
}
