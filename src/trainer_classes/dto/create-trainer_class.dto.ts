import {Trainer} from "../../trainers/entities/trainer.entity";

export class CreateTrainerClassDto {

    price : number
    start_time : string
    end_time : string
    weekdays : string[]
    trainer: Trainer
}
