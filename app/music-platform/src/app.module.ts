import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PlaylistsService } from './playlists/playlists.service';
import { PlaylistsModule } from './playlists/playlists.module';
import { SongModule } from './song/song.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaylistsController } from './playlists/playlists.controller';
import { SongController } from './song/controllers/song.controller';
import { SongService } from './song/services/song.service';
import { UsersController } from './users/controllers/users/users.controller';
import { UsersService } from './users/services/users/users.service';
import { Mongoose } from 'mongoose';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/controllers/auth.controller';
import { AuthService } from './auth/services/auth.service';
import { User } from './entities/user.entity';
import { Playlist } from './entities/playlist.entity';
import { Song } from './entities/song.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Database type (e.g., mysql, postgres, sqlite)
      host: 'localhost', // Database host
      port: 5432, // Database port
      username: 'postgres', // Database username
      password: 'VenElin@10321241/:', // Database password
      database: 'music_db', // Database name
      entities: [User, Playlist, Song],// Entity files (path may vary depending on your project structure)
      synchronize: true, // Automatically create database tables (for development only)
    }),
    TypeOrmModule.forFeature([Playlist, Song, User]),
    UsersModule, 
    PlaylistsModule,
    SongModule,
    AuthModule
    ],
  controllers: [AppController, PlaylistsController, SongController, UsersController, AuthController],
  providers: [AppService, PlaylistsService, SongService, UsersService, AuthService],
})
export class AppModule {}
