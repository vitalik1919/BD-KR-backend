import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import {Expense} from "../../expenses/entities/expense.entity";
import {Income} from "../../incomes/entities/income.entity";

@Entity({name: 'categories'})
export class Category {

    @PrimaryGeneratedColumn()
    id : number

    @Column('varchar', {nullable: false})
    type : string

    @OneToMany(() => Expense, expense => expense.category)
    expenses: Expense[]
    @OneToMany(() => Income, income => income.category)
    incomes: Income[]
}
