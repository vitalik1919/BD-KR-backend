import {Role} from "../entities/user.entity";

export class CreateUserDto {
    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get role(): Role {
        return this._role;
    }

    set role(value: Role) {
        this._role = value;
    }

    constructor(private _username : string, private _password : string, private _role : Role) {
    }
}
