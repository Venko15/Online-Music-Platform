import { Injectable } from '@nestjs/common';

import { CreateUserParams } from 'src/utils/types';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenConfig } from 'src/configs/auth.config';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
@Injectable()
export class AuthService {
  constructor( 
    @InjectModel('User')private userModel: Model<User>,
    private jwtService: JwtService
    ) {}

  async hashToken(data){

    const salt = await bcrypt.genSalt(10);
    var hash = bcrypt.hash(data,salt);
    return hash

  }

  async validateUser(name: string, password: string) {
    const user = await this.userModel.findOne({name:name});

    if (user && await user.password === password) {
      
      const payload = {name: user.name, sub: user.id, playlists: user.playlists};
      const tokens = await this.tokens(user) 

      await this.updateToken(user.id, tokens.refresh_token)
      
      return{
        code:200,
        tokens:tokens
      }
      
    }
    return null;
  }

  async tokens(user){
    const payload = {name: user.name, sub: user.id,  products: user.productids}
    let accToken = await this.jwtService.signAsync(payload,{
      expiresIn: 60*30,
      secret:TokenConfig.at
    });
    let refrToken = await this.jwtService.signAsync(payload,{
      expiresIn: 60*60*24*15,
      secret:TokenConfig.rt
    }); 
    
    return {
      access_token: accToken, 
      refresh_token: refrToken
    };

  }

  async createUser(userDetails: CreateUserParams){

    if(await this.userModel.findOne({name: userDetails.name}) != null){
      return {code:403, message:"Theres already a user with this name"};
    }

    const salt = await bcrypt.genSalt();
    userDetails.password  = await bcrypt.hash(userDetails.password, salt);
    
    const newUser = await this.userModel.create({...userDetails});
    await newUser.save();
    const tokens = await this.tokens(newUser);
  
    await this.updateToken(newUser.id, tokens.refresh_token)
    console.log(tokens);
    return {code:200, tokens};

  }

  async updateToken(uid:number, token:string){
    
    const hash = await this.hashToken(token);
    const user = await this.userModel.findOne({id : uid});
    user.refresh_token = hash;
    await user.save();

  }


  async logout(uid:number){
    const user = await this.userModel.findOne({id:uid});

    user.refresh_token=null;
    await user.save();
    return {code:200};

  }
  async refresh(uid, token){
      const user = await this.userModel.findOne({id:uid});
      if(bcrypt.compare(token, user.refresh_token)){
        return {code:401};
      }
      const tokens = (await this.tokens(user))
      await this.updateToken(user.id, tokens.refresh_token);
      return {code:200}

  }

}
