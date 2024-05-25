import { Module } from '@nestjs/common';

import PrismaModule from 'providers/prisma/prisma.module';
import ShortService from './short.service';
import { ShortController } from './short.controller';
import AuthModule from 'resources/auth/auth.module';

@Module({
    imports: [PrismaModule, AuthModule],
    providers: [ShortService],
    controllers: [ShortController],
    exports: [ShortService],
})
export default class ShortModule { }
