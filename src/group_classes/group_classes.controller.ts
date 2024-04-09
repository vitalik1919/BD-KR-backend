import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupClassesService } from './group_classes.service';
import { CreateGroupClassDto } from './dto/create-group_class.dto';
import { UpdateGroupClassDto } from './dto/update-group_class.dto';

@Controller('group-classes')
export class GroupClassesController {
  constructor(private readonly groupClassesService: GroupClassesService) {}

  @Post()
  create(@Body() createGroupClassDto: CreateGroupClassDto) {
    return this.groupClassesService.create(createGroupClassDto);
  }

  @Get()
  findAll() {
    return this.groupClassesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupClassesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupClassDto: UpdateGroupClassDto) {
    return this.groupClassesService.update(+id, updateGroupClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupClassesService.remove(+id);
  }
}
