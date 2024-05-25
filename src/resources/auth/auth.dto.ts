import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpUserDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}


export class LoginUserDto {
    @IsNotEmpty()
    @IsString()
    emailOrUsername: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
