import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Song } from 'src/schemas/song.schema';
import { Readable } from 'stream';

@Injectable()
export class AppService {
    
    constructor(@InjectModel('Song') private songModel: Model<Song>) {}
    async upload(name, file){
        const newSong = new this.songModel();
        newSong.name = name;
        newSong.file = file;
        return await newSong.save();
    }

    async play(id: string): Promise<Song> {
        return this.songModel.findById(id).exec();
      }
}
