import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateShortDto {
    @IsOptional()
    @IsString()
    url: string;

    @IsNotEmpty()
    @IsString()
    redirectTo: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(86400)
    expiresIn: number;
}
