import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import {adminsProviders} from "./admins.providers";
import {DatabaseModule} from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [AdminsController],
  providers: [...adminsProviders, AdminsService],
})
export class AdminsModule {}
