import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
export enum Role {
    GUEST,
    CUSTOMER,
    TRAINER,
    ADMIN
}
@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {nullable: false})
    username : string

    @Column('varchar', {nullable: false})
    password : string

    @Column('int', {nullable: false})
    role : Role
}
