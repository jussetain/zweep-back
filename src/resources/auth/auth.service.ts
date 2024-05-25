import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { LoginUserDto, SignUpUserDto } from './auth.dto';
import { UsersService } from 'resources/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { MailingService } from 'providers/mailing/mailing.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private mailingService: MailingService
    ) { }

    async login(data: LoginUserDto): Promise<{ accessToken: string }> {
        const user = await this.usersService.login(data);

        return {
            accessToken: await this.generateAccessToken(user.id, user.username)
        };
    }

    async signUp(data: SignUpUserDto): Promise<{ accessToken: string }> {
        const user = await this.usersService.create(data);

        if (!user) {
            return;
        }

        const emailToken = await this.generateAccessToken(user.id, user.username);

        this.mailingService.sendUserConfirmation(user.username, user.email, emailToken);

        return {
            accessToken: await this.generateAccessToken(user.id, user.username)
        };
    }

    async getUserFromToken(accessToken: string) {
        const decodedAccessToken = await this.jwtService.decode(accessToken);

        try {
            const { id, username, iat, exp } = decodedAccessToken;

            const diff = Math.ceil((new Date().getTime() - new Date(iat).getTime()) / 1000);

            if (diff > exp) {
                return;
            }

            const user = this.usersService.findOne({
                id,
                username
            })

            if (!user) {
                return;
            }

            return user;
        } catch (err) {
            return;
        }
    }

    private generateAccessToken = async (id: string, username: string, exp: number = 7 * 24 * 60 * 60) => {
        const payload = {
            id,
            username,
            iat: Date.now(),
            exp
        };

        return await this.jwtService.signAsync(payload, {
            secret: process.env.SECRET_JWT
        });
    }
}
