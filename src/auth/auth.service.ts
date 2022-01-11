import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository) 
        private usersRepository: UsersRepository,
        private jwtService: JwtService){}

    singUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.usersRepository.createUser(authCredentialsDto)
    }

    async singIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}>{
        const { username, password } = authCredentialsDto
        const user = await this.usersRepository.findOne({ username })
        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(user && isPasswordCorrect){
            const payload: JwtPayload = { username }
            const jwt: string = await this.jwtService.sign(payload)

            return { accessToken: jwt }
        }
        else throw new UnauthorizedException('Please check your login credentials');
    }

}
