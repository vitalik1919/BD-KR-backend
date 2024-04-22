import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import {Customer} from "../../customers/entities/customer.entity";
import {Trainer} from "../../trainers/entities/trainer.entity";
import {Transaction} from "../../transactions/entities/transaction.entity";

@Entity({name: 'trainer_classes'})
export class TrainerClass {

    @PrimaryGeneratedColumn()
    id : number

    @Column('decimal', {nullable: false})
    price : number

    @Column('time', {nullable: false})
    start_time : string

    @Column('time', {nullable: false})
    end_time : string

    @Column('varchar', {nullable: false})
    weekdays : any

    @ManyToOne(() => Customer, customer => customer.trainerClasses)
    customer: Customer
    @ManyToOne(() => Trainer, trainer => trainer.trainerClasses)
    trainer: Trainer

    @OneToMany(() => Transaction, transaction => transaction.trainerClass)
    transactions : Transaction[];
}
