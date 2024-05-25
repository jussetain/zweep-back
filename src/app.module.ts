import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailingModule } from './providers/mailing/mailing.module';
import AuthModule from 'resources/auth/auth.module';

import ShortModule from 'resources/short/short.module';
import UsersModule from 'resources/users/users.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ShortModule,
    UsersModule,
    AuthModule,
    MailingModule
  ],
})

export class AppModule { }
