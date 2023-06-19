import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Playlist } from 'src/schemas/playlist.schema';
import { CreatePlaylistDto } from './dto/CreatePlaylist.dto';

@Injectable()
export class PlaylistsService {


}
