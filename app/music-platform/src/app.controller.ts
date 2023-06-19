import { Controller, Get, Post, Body, UploadedFile, UseInterceptors, Param, Res, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  renderHome(@Res() res) {
    res.sendFile(join(__dirname, '../src/public/html', 'songs.html'));
  }

  @Post('createSong')
  @UseInterceptors(FileInterceptor('file'))
  async createSong(@Body() b, @UploadedFile() file: Express.Multer.File) {
    try {
      if (!file) {
        throw new Error('No file provided.');
      }
      return await this.appService.upload(b.name, file);

      // Process the file or perform any desired operations

      return { message: 'Song created successfully.' };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create song.'); // or return an appropriate error response
    }
  }

  @Get('songs/:id/stream')
  async streamSong(@Param('id') id: string, @Res() res: Response) {
    try {
      const song = await this.appService.play(id);
      if (!song) {
        return res.status(404).json({ message: 'Song not found' });
      }
      
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Disposition', `inline; filename=${song.name}.mp3`);
      const base64Data = song.file["buffer"].toString('base64'); // Convert buffer to Base64 string
      const decodedData = Buffer.from(base64Data, 'base64'); // Decode Base64 string to binary data
      
      return res.send(decodedData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to stream song' });
    }
  }
}
