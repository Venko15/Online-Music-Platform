import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from '../entities/playlist.entity';
import { Song } from '../entities/song.entity';

@Injectable()
export class PlaylistsService {

  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
  ) {}

  async addSongToPlaylist(playlistId: number, songId: number): Promise<Playlist> {
    const playlist = await this.playlistRepository.findOneBy({id:playlistId});
    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }

    const song = await this.songRepository.findOneBy({id:songId});
    if (!song) {
      throw new NotFoundException('Song not found');
    }

    playlist.songs.push(song);
    await this.playlistRepository.save(playlist);

    return playlist;
  }

  async getSongsInPlaylist(playlistId: number): Promise<Song[]> {
    const playlist = await this.playlistRepository.findOneBy({id:playlistId});
    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }

    const songs = await this.songRepository
      .createQueryBuilder('song')
      .innerJoin('song.playlists', 'playlist')
      .where('playlist.id = :playlistId', { playlistId })
      .getMany();

    return songs;
  }
}
