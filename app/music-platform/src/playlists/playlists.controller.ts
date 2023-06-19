import { Controller, Post, Get } from '@nestjs/common';
import { SongService } from 'src/song/services/song.service';
import { PlaylistsService } from './playlists.service';

@Controller('playlists')
export class PlaylistsController {
    constructor(private readonly playlistService: PlaylistsService  ){}

}
