import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Song } from 'src/schemas/song.schema';
import { CreateSongDto } from '../dto/CreateSong.dto';

@Injectable()
export class SongService {
/*
  constructor(@InjectModel('Song') private songModel: Model<Song>) {}

  async create(b, file): Promise<Song> {
    const song = new this.songModel();
    song.name = b.name;
    song.file = file;
    return await song.save();
  }

  async remove(id: number): Promise<Song> {
    return await this.songModel.findByIdAndDelete(id).exec();
  }

  async play(id: number): Promise<Song> {
    return await this.songModel.findById(id).exec();
  }

  async like(songId:number, likerId: number): Promise<void> {

    }

  async addToPlaylist(songId:number, playlistId: number): Promise<void> {
    
  }

  */
}
