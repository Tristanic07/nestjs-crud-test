import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDTO, RegisterUserDTO } from './user-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private user: UsersService
    ){}
    
    @Post('/register')
    async registerUser(
        @Body()
        registerUserDTO : RegisterUserDTO
    ){
        return await this.user.registerUser(registerUserDTO);
    }

    @Post('/login')
    async login(
        @Body()
        loginUserDTO : LoginUserDTO
    ){
        return await this.user.login(loginUserDTO);
    }
}
