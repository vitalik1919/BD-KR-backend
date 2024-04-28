import { Module } from '@nestjs/common';
import { ProtocolsService } from './protocols.service';
import { ProtocolsController } from './protocols.controller';
import {protocolsProviders} from "./protocols.providers";
import {DatabaseModule} from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [ProtocolsController],
  providers: [...protocolsProviders, ProtocolsService],
})
export class ProtocolsModule {}
