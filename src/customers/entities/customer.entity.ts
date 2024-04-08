import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from "../../users/entities/user.entity";

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
}
