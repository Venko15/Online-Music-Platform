import { Injectable, NotFoundException, Options } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { JwtService } from '@nestjs/jwt';
import {FindOneOptions, Repository} from 'typeorm'
import { Song } from 'src/entities/song.entity';
import { Playlist } from 'src/entities/playlist.entity';
@Injectable()
export class UsersService {
    constructor( 
        @InjectRepository(User)private userRepository : Repository<User>,
        @InjectRepository(Song)private songRepository : Repository<Song>,
        @InjectRepository(Playlist)private playlistRepository : Repository<Playlist>,

        private jwtService: JwtService
        ) {}


    async getUser(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({id:id});
        if (!user) {
          throw new NotFoundException('User not found');
        }
        return user;
      }


      async getPlaylists(id: number):Promise<{id:number; title: string}[]>{
        const options : FindOneOptions<User> = {
          where: {id},
          relations: ['playlists']
        }
        const user = await this.userRepository.findOne(options);
        console.log(user);
        if(!user){
          throw NotFoundException;
        }
        console.log(user.playlists);
        return user.playlists.map(playlist => ({ id: playlist.id, title: playlist.name }));
      }
      async getSongs(id: number): Promise<{ id: number; title: string }[]> {
        
        const options : FindOneOptions<User> = {
          where: {id},
          relations: ['songs']
        }
        const user = await this.userRepository.findOne(options);
        console.log(user);
        if(!user){
          throw NotFoundException;
        }
        
        return user.songs.map(song => ({ id: song.id, title: song.title }));
      }
}
