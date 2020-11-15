import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthCredentialDto } from './dot/auth-credential.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { getCustomRepository } from 'typeorm';
import { User } from './user.entity';
import { GetUser } from './get-user.decerator';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){

    }

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto):Promise<void>{
        return this.authService.signUp(authCredentialDto);
    }


    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto):Promise<{accessToken: string}>{
        return this.authService.signIn(authCredentialDto);
    }


    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user : User ){
        console.log(user);
    }
}
