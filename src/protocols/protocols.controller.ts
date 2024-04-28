import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProtocolsService } from './protocols.service';

@Controller('protocols')
export class ProtocolsController {
  constructor(private readonly protocolsService: ProtocolsService) {}

  @Get(':hours')
  findCustomerSub(@Param('hours') time : string) {
    return this.protocolsService.getProtocolData(+time)
  }
}
