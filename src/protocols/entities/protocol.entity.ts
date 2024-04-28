import {Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {GroupClass} from "../../group_classes/entities/group_class.entity";
import {User} from "../../users/entities/user.entity";
import {TrainerClass} from "../../trainer_classes/entities/trainer_class.entity";
import { Subscription } from "../../subscriptions/entities/subscription.entity";

@Entity({ name: 'protocols' })
export class Protocol {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {nullable: false})
    action : string

    @Column('timestamp', {nullable: false, default: () => "CURRENT_TIMESTAMP"})
    date : string

    @ManyToOne(() => User, user => user.protocols)
    user: User

    @ManyToOne(() => Subscription, sub => sub.protocols)
    subscription: Subscription

    @ManyToOne(() => TrainerClass, tclass => tclass.protocols)
    trainerClass: TrainerClass

    @ManyToOne(() => GroupClass, gclass => gclass.protocols)
    groupClass: GroupClass
}
