import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from 'src/entities/song.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
    @InjectRepository(User) // Add this line
    private readonly userRepository: Repository<User> // Update the class name
  ) {
  // ...
  }

  async getAllSongs(): Promise<{ id: number; title: string }[]> {
    const songs = await this.songRepository.find({ select: ['id', 'title'] });
    return songs.map(song => ({ id: song.id, title: song.title }));
  }


  async upload(body, file:Express.Multer.File){
      const newSong = new Song();
      const user = await this.userRepository.findOneBy({id:body.id})
      newSong.owner = user;
      console.log(body.name)
      newSong.title = body.fileName;
      newSong.songData = Buffer.from(file.buffer);
      newSong.duration = file.size;


      if (!user.songs) {
        const songs = [];
        songs.push(newSong);
        user.songs = songs;
      } else {
        user.songs.push(newSong);
      }
      await this.userRepository.save(user);
      await this.songRepository.save(newSong);
      const songDto = {
        id: newSong.id,
        name: newSong.title
      };

      return songDto
  }

  
  async getSongById(id: number): Promise<Song> {
    const song = await this.songRepository.findOneBy({id:id});
    if (!song) {
      throw new NotFoundException('Song not found');
    }
    return song;
  }

  async getSongsByOwner(ownerId:number): Promise<{id:number; title: string}[]> {
    const user = await this.userRepository.findOneBy({id:ownerId});
    if(!user){
      throw NotFoundException;
    }
    const songs = await this.songRepository.findBy({owner:user})
    return songs.map(song => ({ id: song.id, title: song.title }));
  }
}

