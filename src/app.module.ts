import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {DatabaseModule} from "./database/database.module";
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, CustomersModule, DatabaseModule, AuthModule]
})
export class AppModule {}
