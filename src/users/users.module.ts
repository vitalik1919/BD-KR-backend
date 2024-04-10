import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {DatabaseModule} from "../database/database.module";
import {userProviders} from "./users.providers";
import {customersProviders} from "../customers/customers.providers";
import {adminsProviders} from "../admins/admins.providers";
import {trainersProviders} from "../trainers/trainers.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...userProviders, ...customersProviders,
              ...adminsProviders, ...trainersProviders,
              UsersService],
  exports: [UsersService]
})
export class UsersModule {


}
