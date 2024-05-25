import { Module } from '@nestjs/common';

import PrismaModule from 'providers/prisma/prisma.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';


@Module({
    imports: [PrismaModule],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})
export default class UsersModule { }
