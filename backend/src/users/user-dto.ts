import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterUserDTO{

    @IsNotEmpty()
    firstName: string

    @IsNotEmpty()
    lastName: string
    
    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    @IsEmail()
    email: string
}

export class LoginUserDTO{
    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    @IsEmail()
    email: string
}