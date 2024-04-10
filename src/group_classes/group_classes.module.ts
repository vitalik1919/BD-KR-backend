import { Module } from '@nestjs/common';
import { GroupClassesService } from './group_classes.service';
import { GroupClassesController } from './group_classes.controller';
import {groupClassesProviders} from "./group_classes.providers";
import {DatabaseModule} from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [GroupClassesController],
  providers: [...groupClassesProviders, GroupClassesService],
})
export class GroupClassesModule {}
