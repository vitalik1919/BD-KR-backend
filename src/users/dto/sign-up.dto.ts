import {Role} from "../entities/user.entity";
import {Gender} from "../../customers/entities/customer.entity";

export class SignUpDto {

    username : string
    password : string
    role : Role
    first_name : string
    last_name : string
    gender : Gender
    date_of_birth : string
}