import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './auth.constants';
import {APP_GUARD} from "@nestjs/core";
import {AuthGuard} from "./auth.guards";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService,
             { provide: APP_GUARD, useClass: AuthGuard, },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}