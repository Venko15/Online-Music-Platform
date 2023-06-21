import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { JwtService } from '@nestjs/jwt';
import {Repository} from 'typeorm'
@Injectable()
export class UsersService {
    constructor( 
        @InjectRepository(User)private userRepository : Repository<User>,
        private jwtService: JwtService
        ) {}


    async getProfile(){
        
    }
    async getUser(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({id:id});
        if (!user) {
          throw new NotFoundException('User not found');
        }
        return user;
      }
}
