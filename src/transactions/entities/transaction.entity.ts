import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import {BoughtSubscription} from "../../bought_subscriptions/entities/bought_subscription.entity";
import {Customer} from "../../customers/entities/customer.entity";
import {Subscription} from "../../subscriptions/entities/subscription.entity";
import {TrainerClass} from "../../trainer_classes/entities/trainer_class.entity";
import {Trainer} from "../../trainers/entities/trainer.entity";
import {GroupClass} from "../../group_classes/entities/group_class.entity";

@Entity({name: 'transactions'})
export class Transaction {

    @PrimaryGeneratedColumn()
    id : number

    @Column('timestamp', {nullable: false, default: () => "CURRENT_TIMESTAMP"})
    date : string

    @Column('decimal', {nullable: false})
    total : number

    @ManyToOne(() => Customer, customer => customer.transactions)
    customer: Customer;
    @ManyToOne(() => Subscription, subscription => subscription.transactions)
    subscription: Subscription;
    @ManyToOne(() => TrainerClass, trainerClass => trainerClass.transactions)
    trainerClass: TrainerClass;
    @ManyToOne(() => GroupClass, groupClass => groupClass.transactions)
    groupClass: GroupClass;
}