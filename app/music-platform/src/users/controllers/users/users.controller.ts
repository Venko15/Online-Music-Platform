import { Controller, Get, Post, Body, UseGuards, Param, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
@Controller("users")
export class UsersController {

    constructor(private userService: UsersService ){}
    

    

    @UseGuards(AuthGuard('access-jwt'))
    @Get("profile")
    async getProfile(@Req() req){

        return await this.userService.getUser(req.user.sub)
    }

    @UseGuards(AuthGuard('access-jwt'))
    @Get("playlists")
    async getPlaylists(@Req() req){

        return await this.userService.getPlaylists(req.user.sub)
    }

    @UseGuards(AuthGuard('access-jwt'))
    @Get("songs")
    async getSongs(@Req() req){
        console.log(req.user);
        return await this.userService.getSongs(req.user.sub);
    }
    
}
