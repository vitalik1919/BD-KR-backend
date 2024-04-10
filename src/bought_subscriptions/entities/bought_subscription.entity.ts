import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import {Customer} from "../../customers/entities/customer.entity";
import {Subscription} from "../../subscriptions/entities/subscription.entity";

@Entity({name: 'bought_subscriptions'})
export class BoughtSubscription {

    @PrimaryGeneratedColumn()
    id : number

    @Column('date', {nullable: false})
    start_date : string
    @Column('date', {nullable: false})
    end_date : string

    @ManyToOne(() => Customer, customer => customer.boughtSubs)
    customer: Customer;

    @ManyToOne(() => Subscription, subscription => subscription.boughtSubs)
    subscription: Subscription;
}
