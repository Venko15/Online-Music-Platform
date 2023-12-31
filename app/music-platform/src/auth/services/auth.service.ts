import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import * as sha256 from 'fast-sha256';
import { TokenConfig } from 'src/configs/auth.config';
@Injectable()
export class AuthService {
  constructor( 
    @InjectRepository(User)private userRepository: Repository<User>,
    private jwtService: JwtService
    ) {}

  async hashToken(data){

    const salt = await bcrypt.genSalt(10);
    var hash = bcrypt.hash(data,salt);
    return hash

  }
  async comparePassword(password1, password2): Promise<boolean> {
    return await bcrypt.compare(password1, password2);
  }

  async validateUser(username: string, password: string) {
    const user = await this.userRepository.findOneBy({username:username});
    console.log(user.password);
    console.log(password);
    console.log(user)
    if (user && await this.comparePassword(password, user.password)) {
      
      const payload = {name: user.username, sub: user.id, playlists: user.playlists, songs: user.songs};
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

  
    if(await this.userRepository.findOneBy({username: userDetails.username}) != null){
      return {code:403, message:"Theres already a user with this name"};
    }

    const salt = await bcrypt.genSalt();
    userDetails.password  = await bcrypt.hash(userDetails.password, salt);
    
    const newUser = this.userRepository.create({...userDetails});
    await this.userRepository.save(newUser);
    const tokens = await this.tokens(newUser);
  
    await this.updateToken(newUser.id, tokens.refresh_token)
    console.log(tokens);
    return {code:200, tokens};

  }


  async updateToken(uid:number, token:string){
    
    const hash = await this.hashToken(token);
    const user = await this.userRepository.findOneBy({id : uid});
    user.refresh_token = hash;
    await this.userRepository.save(user);

  }


  async logout(uid:number){
    const user = await this.userRepository.findOneBy({id:uid});

    user.refresh_token=null;
    await this.userRepository.save(user);
    return {code:200};

  }
  async refresh(uid, token){
      const user = await this.userRepository.findOneBy({id:uid});
      if(bcrypt.compare(token, user.refresh_token)){
        return {code:401};
      }
      const tokens = (await this.tokens(user))
      await this.updateToken(user.id, tokens.refresh_token);
      return {code:200}

  }

}