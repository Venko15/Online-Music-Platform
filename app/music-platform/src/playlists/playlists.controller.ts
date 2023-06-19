import { Controller, Post, Get, Body } from '@nestjs/common';
import { SongService } from 'src/song/services/song.service';
import { PlaylistsService } from './playlists.service';

@Controller('playlists')
export class PlaylistsController {
    constructor(private readonly playlistService: PlaylistsService  ){}

    @Post("/addSong")
    async addSong(@Body() b){
        
    }
}
