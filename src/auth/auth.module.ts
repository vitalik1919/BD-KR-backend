import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './auth.constants';
import {customersProviders} from "../customers/customers.providers";
import {adminsProviders} from "../admins/admins.providers";
import {trainersProviders} from "../trainers/trainers.providers";
import { DataSource } from 'typeorm';
import {DatabaseModule} from "../database/database.module";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
    DatabaseModule
  ],
  providers: [...customersProviders, ...adminsProviders, ...trainersProviders, AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {

}