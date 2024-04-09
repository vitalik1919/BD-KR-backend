import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'trainers'})
export class Trainer {

    @PrimaryGeneratedColumn()
    id : number

    @Column('varchar', {nullable: false})
    first_name : string

    @Column('varchar', {nullable: false})
    last_name : string

    @Column('decimal', {nullable: false})
    wage : number

    @Column('varchar', {nullable: false})
    specialty : string
}
