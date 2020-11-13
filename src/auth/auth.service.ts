import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dot/auth-credential.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository){

    }

    async signUp(authCredentialDto: AuthCredentialDto):Promise<void>{
        return this.userRepository.signUp(authCredentialDto);
    }

    async signIn(authCredentialDto: AuthCredentialDto):Promise<string>{
        const username=await this.userRepository.validateUserPassword(authCredentialDto);
        if (!username){
            throw new UnauthorizedException('invalid credentials')
        }
        return username;
    }

}
