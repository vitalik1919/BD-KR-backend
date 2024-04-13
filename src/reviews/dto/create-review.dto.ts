import {Customer} from "../../customers/entities/customer.entity";

export class CreateReviewDto {

    id: number
    description: string
    rating: number
    customer: Customer
}
