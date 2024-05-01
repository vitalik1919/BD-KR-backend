import {Inject, Injectable} from '@nestjs/common';
import {Subscription} from "../subscriptions/entities/subscription.entity";
import {Repository} from 'typeorm';
import {Category} from "../categories/entities/category.entity";
import {Review} from "../reviews/entities/review.entity";
import * as fs from "fs";
import * as csv from "csv-parser";
import {Role, User} from "../users/entities/user.entity";
import {fa, faker} from "@faker-js/faker";
import {Customer, Gender} from "../customers/entities/customer.entity";
import {Admin} from "../admins/entities/admin.entity";
import {Trainer} from "../trainers/entities/trainer.entity";
import {GroupClass} from "../group_classes/entities/group_class.entity";
import {TrainerClass} from "../trainer_classes/entities/trainer_class.entity";
import {Transaction} from "../transactions/entities/transaction.entity";
import {BoughtSubscription} from "../bought_subscriptions/entities/bought_subscription.entity";
import {Income} from "../incomes/entities/income.entity";
import {Expense} from "../expenses/entities/expense.entity";

@Injectable()
export class DatasetService {

    constructor(
        @Inject('SUBSCRIPTION_REPOSITORY')
        private subscriptionsRepository: Repository<Subscription>,
        @Inject('CATEGORY_REPOSITORY')
        private categoriesRepository: Repository<Category>,
        @Inject('REVIEW_REPOSITORY')
        private reviewsRepository: Repository<Review>,
        @Inject('USER_REPOSITORY')
        private usersRepository: Repository<User>,
        @Inject('CUSTOMER_REPOSITORY')
        private customersRepository: Repository<Customer>,
        @Inject('ADMIN_REPOSITORY')
        private adminsRepository: Repository<Admin>,
        @Inject('TRAINER_REPOSITORY')
        private trainersRepository: Repository<Trainer>,
        @Inject('GROUP_CLASS_REPOSITORY')
        private groupClassesRepository: Repository<GroupClass>,
        @Inject('TRAINER_CLASS_REPOSITORY')
        private trainerClassesRepository: Repository<TrainerClass>,
        @Inject('TRANSACTION_REPOSITORY')
        private transactionsRepository: Repository<Transaction>,
        @Inject('BOUGHT_SUBSCRIPTION_REPOSITORY')
        private boughtSubscriptionsRepository: Repository<BoughtSubscription>,
        @Inject('INCOME_REPOSITORY')
        private incomesRepository: Repository<Income>,
        @Inject('EXPENSE_REPOSITORY')
        private expensesRepository: Repository<Expense>,
    ) {
    }

    async generateData() {


        const userCount = 5000
        for (let i = 0; i < userCount; ++i) {
            await this.usersRepository.save({
                username: faker.internet.userName(),
                password: faker.internet.password(4),
                role: Role[Role[faker.number.int({min: 0, max: Object.keys(Role).length / 2 - 1})]]
            })
        }


        const customers = await this.usersRepository.find({where: {role: Role.CUSTOMER}})
        for (let i = 0; i < customers.length; ++i) {
            await this.customersRepository.save({
                id: customers[i].id,
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                gender: Gender[Gender[faker.number.int({min: 0, max: Object.keys(Gender).length / 2 - 1})]],
                date_of_birth: faker.date.birthdate().toISOString().substring(0, 10)
            })
        }


        await this.readReviewsData()
        await this.readSubscriptionsData()
        await this.readCategoriesData()

        const admins = await this.usersRepository.find({where: {role: Role.ADMIN}})
        for (let i = 0; i < admins.length; ++i) {
            const fname = faker.person.firstName()
            const lname = faker.person.lastName()
            await this.adminsRepository.save({
                id: admins[i].id,
                first_name: fname,
                last_name: lname,
                email: faker.internet.email({ firstName: fname, lastName: lname }),
                wage: faker.number.int({min: 3000, max: 5500}),
                reg_date: faker.date.past({ years: 5}).toISOString().substring(0, 10)
            })
        }


        const specialties = ['Strength and Conditioning', 'Zumba', 'Fitness', 'Yoga', 'Boxing',
            'Crossfit', 'Pilates', 'Sports Psychologist', 'Physical Therapist', 'Crossfit', 'Weight Loss'];
        const trainers = await this.usersRepository.find({where: {role: Role.TRAINER}})
        for (let i = 0; i < trainers.length; ++i) {

            await this.trainersRepository.save({
                id: trainers[i].id,
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                wage: 5000,
                specialty: specialties[faker.number.int({min: 0, max: specialties.length - 1})]
            })
        }

        await this.readGroupClassesData()

        const trainerClassesCount = 5000
        const allTrainers = await this.trainersRepository.find()
        const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
        for(let i = 0; i < trainerClassesCount; ++i) {
            let weekdaysMid : string[] = []
            const daysNum = faker.number.int({min: 1, max: 4})
            for(let j = 0; j < daysNum; ++j) {
                weekdaysMid.push(days[faker.number.int({min: 0, max: days.length - 1})])
            }
            const weekdays = weekdaysMid.filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
            const weekdaysObj = {
                weekdays: weekdays
            }

            const start_time = faker.date.between({from: '2024-04-22T10:00:00', to: '2024-04-22T20:00:00'})
            const end_time = new Date(start_time);
            end_time.setHours(start_time.getHours() + 1);

            await this.trainerClassesRepository.save({
                price: faker.number.int({min: 25, max: 90}),
                start_time: start_time.toISOString().substring(11, 16),
                end_time: end_time.toISOString().substring(11, 16),
                weekdays: this.removeBackslashes(JSON.stringify(weekdaysObj)),
                trainer: allTrainers[faker.number.int({min: 0, max: allTrainers.length - 1})]
            })
        }

        const allCustomers = await this.customersRepository.find()
        const transactionsCount = 5000
        for(let i = 0; i < transactionsCount; ++i) {
            const index = faker.number.int({min: 0, max: 2})
            switch (index) {
                case 0: {
                    const subs = await this.subscriptionsRepository.find()
                    const randomSub = subs[faker.number.int({min: 0, max: subs.length - 1})]
                    await this.transactionsRepository.save({
                        date: faker.date.past({years: 4}).toISOString(),
                        total: randomSub.price,
                        customer: allCustomers[faker.number.int({min: 0, max: allCustomers.length - 1})],
                        subscription: randomSub
                    })
                    break
                }
                case 1: {
                    const tclasses = await this.trainerClassesRepository.find()
                    const randomTClass = tclasses[faker.number.int({min: 0, max: tclasses.length - 1})]
                    await this.transactionsRepository.save({
                        date: faker.date.past({years: 4}).toISOString(),
                        total: randomTClass.price,
                        customer: allCustomers[faker.number.int({min: 0, max: allCustomers.length - 1})],
                        trainerClass: randomTClass
                    })
                    break
                }
                case 2: {
                    const gclasses = await this.groupClassesRepository.find()
                    const randomGClass = gclasses[faker.number.int({min: 0, max: gclasses.length - 1})]
                    await this.transactionsRepository.save({
                        date: faker.date.past({years: 4}).toISOString(),
                        total: randomGClass.price,
                        customer: allCustomers[faker.number.int({min: 0, max: allCustomers.length - 1})],
                        groupClass: randomGClass
                    })
                    break
                }
                default: {
                    break
                }
            }
        }


        const allSubscriptions = await this.subscriptionsRepository.find()
        const boughtCount = 5000
        for(let i = 0; i < boughtCount; ++i) {
            await this.boughtSubscriptionsRepository.save({
                start_date: faker.date.between({from: '2020-01-01T00:00:00', to: '2023-01-01T00:00:00'}).toISOString(),
                is_active: false,
                customer: allCustomers[faker.number.int({min: 0, max: allCustomers.length - 1})],
                subscription:  allSubscriptions[faker.number.int({min: 0, max: allSubscriptions.length - 1})]
            })
        }


        const allCategories = await this.categoriesRepository.find()
        const incomeCategories = allCategories.filter(category => category.id >= 18 && category.id <= 27);
        const incomesCount = 3000
        for(let i = 0; i < incomesCount; ++i) {
            await this.incomesRepository.save({
                sum: faker.number.int({min: 20, max: 1000}),
                i_date: faker.date.between({from: '2022-01-01T00:00:00', to: '2024-05-01T00:00:00'}).toISOString(),
                category: incomeCategories[faker.number.int({min: 0, max: incomeCategories.length - 1})]
            })
        }


        const expensesCount = 1500
        for(let i = 0; i < expensesCount; ++i) {
            await this.expensesRepository.save({
                sum: faker.number.int({min: 20, max: 1000}),
                e_date: faker.date.between({from: '2022-01-01T00:00:00', to: '2024-05-01T00:00:00'}).toISOString(),
                category: allCategories[faker.number.int({min: 0, max: allCategories.length - 1})]
            })
        }
    }

    private removeBackslashes(inputString) {
        return inputString.replace(/\\/g, '');
    }

    private async readSubscriptionsData() {

        const results = [];
        const fileStream = fs.createReadStream('subscriptions.csv')
            .pipe(csv())
            .on('data', async (data) => {
                this.subscriptionsRepository.save(data)
            })
    }

    private async readCategoriesData() {

        const results = [];
        const fileStream = fs.createReadStream('categories.csv')
            .pipe(csv())
            .on('data', async (data) => {
                this.categoriesRepository.save(data)
            })
    }

    private async readReviewsData() {

        const customers = await this.customersRepository.find()
        const results = [];
        const fileStream = fs.createReadStream('reviews.csv')
            .pipe(csv())
            .on('data', async (data) => {
                this.reviewsRepository.save({
                    rating: data.rating,
                    description: data.description,
                    customer: customers[faker.number.int({min: 0, max: customers.length - 1})]
                })
            })
    }
    private async readGroupClassesData() {

        const trainers = await this.trainersRepository.find()
        const fileStream = fs.createReadStream('group_classes.csv')
            .pipe(csv())
            .on('data', async (data) => {
                this.groupClassesRepository.save({
                    type: data.type,
                    price: data.price,
                    day: data.day,
                    start_time: data.start_time,
                    space_left: data.space_left,
                    trainer: trainers[faker.number.int({min: 0, max: trainers.length - 1})]
                })
            })
    }

}
