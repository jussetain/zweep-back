import { Controller, Get, Req, Param, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, SignUpUserDto } from './auth.dto';

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    async create(@Body() body: SignUpUserDto): Promise<any> {
        return await this.authService.signUp(body);
    }

    @Post('/login')
    async authenticate(@Body() body: LoginUserDto): Promise<any> {
        return this.authService.login(body);
    }
}
