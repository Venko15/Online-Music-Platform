import { Controller, Post, UseGuards, Body, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SongService } from '../services/song.service';
import { CreateSongDto } from '../dto/CreateSong.dto';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
@Controller('song')
export class SongController {

  constructor(private readonly songService: SongService) {}
/*
  @Post('createSong')
  @UseInterceptors(FilesInterceptor('file'))
  async createSong(@Body() b,@UploadedFile() f) {
    console.log(f)

  }

  @Post('remove')

  async removeSong(@Body() { id }: { id: number }) {
    return this.songService.remove(id);
  }

  @Post('/:id/play')
  async playSong(@Param('id') id: number) {
    return this.songService.play(id);
  }

  @Post('like')

  async likeSong(@Body() b) {
    return this.songService.like(b.songID, b.likerID);
  }

  @Post('addToPlaylist')

  async addToPlaylist(@Body() b) {
    return this.songService.addToPlaylist(b.songID, b.playlistID);
  }
  */
}
