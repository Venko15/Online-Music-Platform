import { Controller, Request,Res, Post, UseGuards, Body, Get, HttpStatus, Session, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

import {join} from 'path'
import { JwtRtAuthGuard } from '../guards/jwtRtAuthGuard.guard';
import { AuthGuard } from '@nestjs/passport';
import { JwtAtAuthGuard } from '../guards/jwtAtAuth.guard';


@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    
    @Post('/login')
    async login(@Body() b, @Res({passthrough:true}) res, @Req() req){
        
        const tokenJ = await this.authService.validateUser(b['name'], b['password'])
        if(tokenJ == null){
            res.status(HttpStatus.UNAUTHORIZED).send("Wrong login credentials");
            return;
            
        }
        
        return res.status(HttpStatus.OK).json(tokenJ.tokens)
 
    }

    
    @Post('/register')
    async register(@Body() createUserDto: CreateUserDto){

        return await this.authService.createUser(createUserDto);
    }

    
    @UseGuards(AuthGuard('access-jwt'))
    @Post("/logout")
    async logout(@Req() req){

        return await this.authService.logout(req.user.sub);
    }
    
    @UseGuards(AuthGuard('refresh-jwt'))
    @Post("/refresh")
    async refresh(@Req() req ){

        return await this.authService.refresh(req.user["sub"], req.user["token"])
    }
    
}
