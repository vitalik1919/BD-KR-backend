import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

enum Role {
  GUEST,
  CUSTOMER,
  TRAINER,
  ADMIN
}

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
