import { Module } from '@nestjs/common';
import { GroupClassesService } from './group_classes.service';
import { GroupClassesController } from './group_classes.controller';

@Module({
  controllers: [GroupClassesController],
  providers: [GroupClassesService],
})
export class GroupClassesModule {}
