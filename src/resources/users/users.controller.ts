import { Controller, Get, Req, Param, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './users.dto';

@Controller('users/')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post('/create')
    async postUser(@Body() body: CreateUserDto): Promise<any> {
        const { email, username, password } = body;
        const result = await this.usersService.create({
            email,
            username,
            password,
            createdAt: new Date()
        })
        return result;
    }
}
