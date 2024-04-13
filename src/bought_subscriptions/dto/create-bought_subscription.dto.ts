import {Customer} from "../../customers/entities/customer.entity";
import {Subscription} from "../../subscriptions/entities/subscription.entity";

export class CreateBoughtSubscriptionDto {
    id: number
    customer : Customer
    subscription : Subscription
}
