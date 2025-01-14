
import {IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { UserFunction } from "src/entities/user.entities";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(20, { message: 'Password must not exceed 20 characters' })
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).*$/, {
        message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
    })
    password: string;

    @IsNotEmpty()
    @IsEnum(UserFunction)
    function: UserFunction
}