import {Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import {BoughtSubscription} from "../../bought_subscriptions/entities/bought_subscription.entity";

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
}
