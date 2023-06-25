import { Controller, Post, Get, Body, Param, UseGuards, Req } from '@nestjs/common';
import { SongService } from 'src/song/services/song.service';
import { PlaylistsService } from './playlists.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('playlists')
export class PlaylistsController {
    constructor(private readonly playlistService: PlaylistsService  ){}

    @UseGuards(AuthGuard('access-jwt'))
    @Post("createPlaylist")
    async createPlaylist(@Body() playlist, @Req() req) {
      playlist.ownerId = req.user.sub;
      console.log(req.user.sub)
      return await this.playlistService.createPlaylist(playlist);
    }

    @Get("getall")
    async getAll(){
      return await this.playlistService.getAll();
    }

    @UseGuards(AuthGuard('access-jwt'))
    @Post(':id/songs/:songId')
    async addSongToPlaylist(@Param('id') playlistId: number,@Param('songId') songId: number,) {
      const playlist =  await this.playlistService.addSongToPlaylist(playlistId, songId);
      return {code:200};
    }


    @Get(":id")
    async getSongsInPlaylist(@Param('id') playlistId: number){
        return await this.playlistService.getSongsInPlaylist(playlistId);
    }
    
    @UseGuards(AuthGuard('access-jwt'))
    @Get("")
    async getOwnerPlaylist(@Req() req) {
      return await this.playlistService.getPlaylistByOwner(req.user.sub);
    }
}
