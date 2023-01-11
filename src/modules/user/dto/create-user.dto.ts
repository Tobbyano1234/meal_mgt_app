import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"


export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

}
