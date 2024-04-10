import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { User } from "../../users/entities/user.entity";
import {Review} from "../../reviews/entities/review.entity";
import {TrainerClass} from "../../trainer_classes/entities/trainer_class.entity";
import {BoughtSubscription} from "../../bought_subscriptions/entities/bought_subscription.entity";
import {GroupClass} from "../../group_classes/entities/group_class.entity";

export enum Gender {
    MALE,
    FEMALE,
    OTHER
}
@Entity({ name: 'customers' })
export class Customer {

    @PrimaryGeneratedColumn()
    id : number

    @Column('varchar', {nullable: false})
    first_name : string

    @Column('varchar', {nullable: false})
    last_name : string

    @Column('int', {nullable: false})
    gender : number

    @Column('date', {nullable: false})
    date_of_birth : string

    @OneToOne(() => User)
    @JoinColumn({ name: "id", referencedColumnName: "id" })
    user: User;


    @ManyToOne(() => GroupClass, groupClass => groupClass.customers)
    groupClass: GroupClass;

    @OneToMany(() => Review, review => review.customer)
    reviews: Review[]
    @OneToMany(() => TrainerClass, trainerClass => trainerClass.customer)
    trainerClasses: TrainerClass[]
    @OneToMany(() => BoughtSubscription, boughtSubs => boughtSubs.customer)
    boughtSubs: BoughtSubscription[]
}
