import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';


@Injectable()
export class UsersService {
/*
    constructor(@InjectModel(User.name) private UserModel: Model<User>){}
    async getFavSong(){

    }   
    async getProfile(){

    } 

    */


}
