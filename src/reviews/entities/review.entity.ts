import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import {Expense} from "../../expenses/entities/expense.entity";
import {Income} from "../../incomes/entities/income.entity";
import {Customer} from "../../customers/entities/customer.entity";

@Entity({name: 'reviews'})
export class Review {

    @PrimaryGeneratedColumn()
    id : number

    @Column('int', {nullable: false})
    rating : number

    @Column('varchar')
    description : string

    @ManyToOne(() => Customer, customer => customer.reviews)
    customer: Customer
}
