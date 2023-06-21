import { Controller, Post, UseGuards, Get,Body, Param, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { SongService } from '../services/song.service';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { Response } from 'express';
@Controller('song')
export class SongController {

  constructor(private readonly songService: SongService) {}
  @Post('createSong')

  @UseInterceptors(FileInterceptor('file'))
  async createSong(@Body() b, @UploadedFile() file: Express.Multer.File) {
    try {
      if (!file) {
        throw new Error('No file provided.');
      }
      return await this.songService.upload(b, file);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create song.'); // or return an appropriate error response
    }

  }

  @Get('')
  async getAllSong(){
    return await this.songService.getAllSongs();
  }

  @Get(':id')
  async getSongById(@Param('id') id: number) {
    const song = await this.songService.getSongById(id);

    return {code:200, title:song.title, id: song.id};
  }
  
  @Get(':id/stream')
  async playSong(@Param('id') id: number, @Res() res: Response) {
    try {
      const song = await this.songService.getSongById(id);
      if (!song) {
        return res.status(404).json({ message: 'Song not found' });
      }
      
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Disposition', `inline; filename=${song.title}.mp3`);
      const base64Data = song.songData.toString('base64'); 
      const decodedData = Buffer.from(base64Data, 'base64');
      
      return res.send(decodedData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to stream song' });
    }
  }

  }
