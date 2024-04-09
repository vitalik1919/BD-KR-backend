import {Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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

}
