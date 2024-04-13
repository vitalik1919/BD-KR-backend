import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import {Customer} from "../../customers/entities/customer.entity";
import {Subscription} from "../../subscriptions/entities/subscription.entity";

@Entity({name: 'bought_subscriptions'})
export class BoughtSubscription {

    @PrimaryGeneratedColumn()
    id : number

    @Column('timestamp', {nullable: false, default: () => "CURRENT_TIMESTAMP" })
    start_date : string
    @Column('boolean', {nullable: false, default: true})
    is_active : boolean

    @ManyToOne(() => Customer, customer => customer.boughtSubs)
    customer: Customer;

    @ManyToOne(() => Subscription, subscription => subscription.boughtSubs)
    subscription: Subscription;
}
