import { Controller, Get, Post, Body, UseGuards, Param, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
@Controller("users")
export class UsersController {

    constructor(private userService: UsersService ){}
    
    @Get(':id')
    async getUser(@Param('id') id: number) {
      return this.userService.getUser(id);
    }
    
    //needs access guard
    async getProfile(){

    }
}
