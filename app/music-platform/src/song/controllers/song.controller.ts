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
      return await this.songService.upload(b.name, file);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create song.'); // or return an appropriate error response
    }
  }

  @Get(':id/stream')
  async playSong(@Param('id') id: string, @Res() res: Response) {
    try {
      const song = await this.songService.findById(id);
      if (!song) {
        return res.status(404).json({ message: 'Song not found' });
      }
      
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Disposition', `inline; filename=${song.name}.mp3`);
      const base64Data = song.file["buffer"].toString('base64'); 
      const decodedData = Buffer.from(base64Data, 'base64');
      
      return res.send(decodedData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to stream song' });
    }
  }

  }
