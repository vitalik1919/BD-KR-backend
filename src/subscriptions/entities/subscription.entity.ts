import {Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import {BoughtSubscription} from "../../bought_subscriptions/entities/bought_subscription.entity";
import {Transaction} from "../../transactions/entities/transaction.entity";
import {Protocol} from "../../protocols/entities/protocol.entity";

@Entity({name: 'subscriptions'})
export class Subscription {

    @PrimaryGeneratedColumn()
    id : number

    @Column('varchar', {nullable: false})
    type : string

    @Column('decimal', {nullable: false})
    price : number

    @Column('int', {nullable: false})
    days : number

    @Column('time', {nullable: false})
    start_time : string

    @Column('time', {nullable: false})
    end_time : string

    @OneToMany(() => BoughtSubscription, boughtSubs => boughtSubs.subscription)
    boughtSubs: BoughtSubscription[]
    @OneToMany(() => Transaction, transaction => transaction.subscription)
    transactions : Transaction[];
    @OneToMany(() => Protocol, protocol => protocol.subscription)
    protocols : Protocol[];
}
