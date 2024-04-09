import { Module } from '@nestjs/common';
import { GroupClassesService } from './group_classes.service';
import { GroupClassesController } from './group_classes.controller';
import {groupClassesProviders} from "./group_classes.providers";

@Module({
  controllers: [GroupClassesController],
  providers: [...groupClassesProviders, GroupClassesService],
})
export class GroupClassesModule {}
