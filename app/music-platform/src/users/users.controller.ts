import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Post("register")
    async register(){

    }

    @Post("login")
    async login(){

    }

    @Get("profile")
    async profile(){

    }

}
