import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import {Category} from "../../categories/entities/category.entity";

@Entity({name: 'incomes'})
export class Income {

    @PrimaryGeneratedColumn()
    id : number

    @Column('decimal', {nullable: false})
    sum : number

    @Column('date', {nullable: false})
    i_date : string

    @ManyToOne(() => Category, category => category.expenses)
    category: Category;
}
