import {Gender} from "../entities/customer.entity";

export class CreateCustomerDto {
    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get first_name(): string {
        return this._first_name;
    }

    set first_name(value: string) {
        this._first_name = value;
    }

    get last_name(): string {
        return this._last_name;
    }

    set last_name(value: string) {
        this._last_name = value;
    }

    get gender(): Gender {
        return this._gender;
    }

    set gender(value: Gender) {
        this._gender = value;
    }

    get date_of_birth(): string {
        return this._date_of_birth;
    }

    set date_of_birth(value: string) {
        this._date_of_birth = value;
    }


    constructor(private _id : number, private _first_name : string, private _last_name : string,
                private _gender : Gender, private _date_of_birth : string) {
    }
}
