import { Repository, EntityRepository } from "typeorm";
import {User} from './user.entity'
import * as bcrypt from 'bcrypt'
import { AuthCredentialDto } from "./dot/auth-credential.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    
    async signUp(authCredentailDto: AuthCredentialDto): Promise<void>{
        const {username , password} = authCredentailDto;

        //
        const user = new User();
        user.username= username;
        user.salt= await bcrypt.genSalt();
        user.password=await this.hashPassword(password, user.salt);
        try{
            await user.save();
        } catch(error){
            console.log(error.code)
            if (error.code === '23505'){
                throw new ConflictException('username already existes')
            }
            else{
                throw new InternalServerErrorException();
            }
        }

    }

    async validateUserPassword(authCredentailDto: AuthCredentialDto): Promise<string>{
        const {username , password} = authCredentailDto;

        const user = await this.findOne({username});

        if (user && await user.validatePassword(password)){
            return user.username;
        }else{
            return null;
        }

    }

    private async hashPassword(password: string, salt: string):Promise<string>{
        return bcrypt.hash(password,salt);
    }
}