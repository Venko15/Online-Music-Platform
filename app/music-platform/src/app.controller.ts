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


}
