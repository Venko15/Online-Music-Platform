import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PlaylistsService } from './playlists/playlists.service';
import { PlaylistsModule } from './playlists/playlists.module';
import { SongModule } from './song/modules/song.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaylistsController } from './playlists/playlists.controller';
import { SongController } from './song/controllers/song.controller';
import { SongService } from './song/services/song.service';
import { UsersController } from './users/controllers/users/users.controller';
import { UsersService } from './users/services/users/users.service';
import { Mongoose } from 'mongoose';
import { SongModel } from './schemas/song.schema';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://weedfox8:2wO1YmXt5wC7JM8w@music.kebtelc.mongodb.net/?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{name:"Song", schema:SongModel.schema}]),
    UsersModule, 
    PlaylistsModule,
    SongModule
    ],
  controllers: [AppController, PlaylistsController, SongController, UsersController],
  providers: [AppService, PlaylistsService, SongService, UsersService],
})
export class AppModule {}
