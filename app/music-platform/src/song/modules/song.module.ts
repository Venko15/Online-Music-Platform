import { Module } from '@nestjs/common';
import { SongController } from '../controllers/song.controller';
import { SongService } from '../services/song.service';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from 'src/configs/multer.config';
import { MongooseModule } from '@nestjs/mongoose';
import { SongModel } from 'src/schemas/song.schema';
@Module({
  imports:[ 
     MongooseModule.forFeature([{name:"Song", schema:SongModel.schema}]),
 ],
  controllers: [
    SongController],
  providers: [SongService]
})
export class SongModule {}
