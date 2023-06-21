import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { SongService } from 'src/song/services/song.service';
import { PlaylistsService } from './playlists.service';

@Controller('playlists')
export class PlaylistsController {
    constructor(private readonly playlistService: PlaylistsService  ){}

    @Post(':id/songs/:songId')
    async addSongToPlaylist(
      @Param('id') playlistId: number,
      @Param('songId') songId: number,
    ) {
      return this.playlistService.addSongToPlaylist(playlistId, songId);
    }
}
