import { Module } from '@nestjs/common';

import PrismaModule from 'providers/prisma/prisma.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'resources/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { MailingModule } from 'providers/mailing/mailing.module';

@Module({
    imports: [PrismaModule, MailingModule],
    providers: [AuthService, UsersService, JwtService],
    controllers: [AuthController],
    exports: [AuthService],
})

export default class AuthModule { }
