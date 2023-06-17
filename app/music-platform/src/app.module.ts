import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PlaylistsService } from './playlists/playlists.service';
import { PlaylistsModule } from './playlists/playlists.module';

@Module({
  imports: [UsersModule, PlaylistsModule],
  controllers: [AppController],
  providers: [AppService, PlaylistsService],
})
export class AppModule {}
