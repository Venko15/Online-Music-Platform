import { Module } from '@nestjs/common';
import { PlaylistsController } from './playlists.controller';
import { PlaylistsService } from './playlists.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Playlist, PlaylistModel } from 'src/schemas/playlist.schema';

@Module({
  imports:[  MongooseModule.forFeature([{name:'Playlist', schema:PlaylistModel.schema}])],
  controllers: [PlaylistsController],
  providers: [PlaylistsService],
})
export class PlaylistsModule {}
