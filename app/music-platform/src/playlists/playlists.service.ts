import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Playlist,  } from 'src/schemas/playlist.schema';
import { CreatePlaylistDto } from './dto/CreatePlaylist.dto';

@Injectable()
export class PlaylistsService {

    constructor(@InjectModel('Playlist') private playlistModel: Model<Playlist>) {}
    
    async add(playlistID, songID:string){
        const playlist = await this.playlistModel.findById(playlistID);
        playlist.songs.push(songID)

    }


    async findAllPlaylistsById(ownerId){
        const playlists = await this.playlistModel.findOne({ownerId:ownerId})
        
        return playlists;

    }
}
