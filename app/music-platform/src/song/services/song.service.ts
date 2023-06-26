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

  async getAllSongs() {
    const songs = await this.songRepository.find({ select: ['id', 'title', 'owner'] });
    return songs.map(song => ({ id: song.id, title: song.title , owner:song.owner}));
  }


  async upload(body, file:Express.Multer.File){

      const user = await this.userRepository.findOneBy({id:body.id})
      const newSong = new Song();
      newSong.owner = user;

      newSong.title = body.name;
      newSong.songData = Buffer.from(file.buffer);
      newSong.duration = file.size;

      const saveSong = await this.songRepository.save(newSong);

      // Retrieve the user's playlists
      const songs = await this.songRepository.find({
        where: { owner: user }
      });
      
      user.songs = songs;
      user.songs.push(saveSong);
      await this.userRepository.save(user);


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
   
    const user = await this.userRepository.findOneBy({ id: ownerId });
    if (!user) {
      throw NotFoundException;
    }
  
    const songs = user.songs; // Access the songs directly from the user entity
    return songs.map(song => ({ id: song.id, title: song.title }));
  }

  
}

