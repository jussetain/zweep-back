import { Controller, Get, Req, Param, Post, Body, UseGuards } from '@nestjs/common';

import ShortService from './short.service';

import { Short, User } from '@prisma/client';
import { CreateShortDto } from './short.dto';
import { AuthGuard } from 'guards/jwt.guard';
import { AuthenticatedUser } from 'decorators/user.decorator';
import { OptionnalAuthGuard } from 'guards/jwtOptionnal.guard';
import { generateRandomString } from 'providers/utils/hash';

@Controller('short/')
export class ShortController {
    constructor(private shortService: ShortService) { }

    @Get()
    @UseGuards(AuthGuard)
    async getShorts(@AuthenticatedUser('user') user: User): Promise<Short[]> {
        const result = await this.shortService.findMany({
            where: {
                userId: user.id
            }
        });
        return result;
    }

    @Get(':key')
    async getShort(@Param('key') key: string): Promise<Short> {
        const result = await this.shortService.findOne({
            url: key
        });
        if (!result) {
            return;
        }

        await this.shortService.update({
            where: {
                id: result.id
            },
            data: {

            }
        })

        return result;
    }

    @Post()
    @UseGuards(OptionnalAuthGuard)
    async postShort(
        @Body() body: CreateShortDto,
        @AuthenticatedUser('user') user: User
    ): Promise<any> {
        const { url, redirectTo, expiresIn } = body;

        let randomString = url;

        if (!user || !url) {
            let isStringExists = true;
            do {
                randomString = generateRandomString(8);
                const short = await this.shortService.findOne({
                    url: randomString
                });
                isStringExists = !!short;
            } while (isStringExists);
        }

        const result = await this.shortService.create({
            userId: user ? user.id : null,
            url: randomString,
            redirectTo,
            createdAt: new Date(),
            expiresIn: user ? expiresIn : 3600 * 24
        });

        return result;
    }
}
