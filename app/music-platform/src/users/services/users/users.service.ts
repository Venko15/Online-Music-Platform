import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { JwtService } from '@nestjs/jwt';
import {Repository} from 'typeorm'
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

      async getSongs(id: number):Promise<{id:number; title: string}[]>{
        const user = await this.userRepository.findOneBy({id:id});
        if(!user){
          throw NotFoundException;
        }

        const songs = await this.songRepository.findBy({owner:user})
        return songs.map(song => ({ id: song.id, title: song.title }));
      }

      async getPlaylists(id: number):Promise<{id:number; title: string}[]>{
        const user = await this.userRepository.findOneBy({id:id});
        if(!user){
          throw NotFoundException;
        }

        const playlist = await this.playlistRepository.findBy({owner:user})
        console.log(playlist)
        return playlist.map(playlist => ({ id: playlist.id, title: playlist.name }));
      }

}
