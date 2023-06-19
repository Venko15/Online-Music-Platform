import { Controller, Get, Post, Body, UseGuards, Param, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller("users")
export class UsersController {

    constructor(private userService: UsersService ){}
    
    @Get("profile")
    async getProfile(){

    }



}
