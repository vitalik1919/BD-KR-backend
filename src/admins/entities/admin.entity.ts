import {Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: 'admins'})
export class Admin {

    @PrimaryGeneratedColumn()
    id : number

    @Column('varchar', {nullable: false})
    first_name : string

    @Column('varchar', {nullable: false})
    last_name : string

    @Column('varchar', {nullable: true})
    email : string

    @Column('timestamp', {nullable: false, default: () => "CURRENT_TIMESTAMP"})
    reg_date : string

    @Column('decimal', {nullable: false})
    wage : number

}
