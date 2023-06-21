import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from 'src/entities/song.entity';
import { SongController } from './controllers/song.controller';
import { SongService } from './services/song.service';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song, User])],
  controllers: [SongController],
  providers: [SongService],
})
export class SongModule {}