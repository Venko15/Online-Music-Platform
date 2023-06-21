import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistsController } from './playlists.controller';
import { PlaylistsService } from './playlists.service';
import { Playlist } from '../entities/playlist.entity';
import { Song } from '../entities/song.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, Song])],
  controllers: [PlaylistsController],
  providers: [PlaylistsService],
})
export class PlaylistsModule {}
