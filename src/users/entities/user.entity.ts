import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import {Protocol} from "../../protocols/entities/protocol.entity";

export enum Role {
    CUSTOMER,
    ADMIN,
    TRAINER,
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

    @OneToMany(() => Protocol, protocol => protocol.user)
    protocols : Protocol[];
}
