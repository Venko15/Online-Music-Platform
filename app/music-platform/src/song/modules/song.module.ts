import { Module } from '@nestjs/common';
import { SongController } from '../controllers/song.controller';
import { SongService } from '../services/song.service';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from 'src/configs/multer.config';
@Module({
  imports:[  ],
  controllers: [
    SongController],
  providers: [SongService]
})
export class SongModule {}
