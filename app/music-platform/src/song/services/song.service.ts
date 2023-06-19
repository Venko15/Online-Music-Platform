import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Song } from 'src/schemas/song.schema';

@Injectable()
export class SongService {
  constructor(@InjectModel('Song') private songModel: Model<Song>) {}

  async upload(name, file){
      const newSong = new this.songModel();
      newSong.name = name;
      newSong.file = file;
      return await newSong.save();
  }

  async findById(id: string): Promise<Song> {
      return await this.songModel.findById(id).exec();
    }
}
