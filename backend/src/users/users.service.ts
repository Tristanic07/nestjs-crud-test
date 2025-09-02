import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LoginUserDTO, RegisterUserDTO } from './user-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ){}

    async registerUser(registerUserDTO: RegisterUserDTO): Promise <{id: number, email: string}>{
        try {

            const existingUser = await this.searchUser(registerUserDTO.email);

            if(existingUser){
                throw new BadRequestException('Something bad happened', {
                    cause: new Error(),
                    description: 'Email already exist',
                }); 
            };

            const hash = await this.encryptPassword(registerUserDTO.password, 10);

            registerUserDTO.password = hash;

            return await this.prisma.user.create({
                data: registerUserDTO,
                select: {
                    email: true,
                    id: true
                }
            }) 
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Failed add task')
        }
    }

    async login(LoginUserDTO: LoginUserDTO){
        try {

            const user = await this.searchUser(LoginUserDTO.email);

            if(!user){
                throw new UnauthorizedException('Account does not exist');
            }

            const isMatched = await this.decryptPassword(LoginUserDTO.password, user.password);

            if(!isMatched){
                throw new UnauthorizedException('Credentials does not match');
            }

            const payload = { id: user.id, email: user.email };
            
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
            
        } catch (error) {
            throw new InternalServerErrorException('Server Error!')
        }
    }

    async searchUser(email){
        try {
            return await this.prisma.user.findFirst({where: {email : email}})
        } catch (error) {
            throw new InternalServerErrorException('Server Error')
        }
    }

    async encryptPassword(password, saltRound){
        return await bcrypt.hash(password, saltRound);
    }

    async decryptPassword(password, hash){
        return await bcrypt.compare(password, hash);
    }
}
