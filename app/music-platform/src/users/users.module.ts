import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { Playlist } from 'src/entities/playlist.entity';
import { Song } from 'src/entities/song.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Song, Playlist])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
