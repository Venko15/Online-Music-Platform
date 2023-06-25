import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from '../entities/playlist.entity';
import { Song } from '../entities/song.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class PlaylistsService {

  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    ) {}

    async createPlaylist(body) {
      const pl = new Playlist();
      const user = await this.userRepository.findOneBy({ id: body.ownerId });
      pl.owner = user;
      pl.name = body.name;
    
      if (!user.playlists) {
        const playlists = [];
        playlists.push(pl);
        user.playlists = playlists;
      } else {
        user.playlists.push(pl);
      }
    
      await this.userRepository.save(user);
      await this.playlistRepository.save(pl);
    
      // Create a DTO for playlist data without circular references
      const playlistDto = {
        id: pl.id,
        name: pl.name,
        songs: pl.songs,
        owner: {
          id: pl.owner.id, // Include only the necessary properties of the owner
          username: pl.owner.username // Include only the necessary properties of the owner
        }
      };
      console.log(pl)
    
      return playlistDto;
    }
    

    async addSongToPlaylist(playlistId: number, songId: number): Promise<Playlist> {
      const playlist = await this.playlistRepository
        .createQueryBuilder('playlist')
        .leftJoinAndSelect('playlist.songs', 'song')
        .where('playlist.id = :playlistId', { playlistId })
        .getOne();
    
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

  async getAll(){
    
    const playlists = await this.playlistRepository.find();
    
    return playlists.map(playlist => ({id:playlist.id, name: playlist.name, songs:this.getSongsInPlaylist(playlist.id)}))
  
  }
  async getSongsInPlaylist(playlistId: number): Promise<{id:number; title:string}[]> {
    const playlist = await this.playlistRepository.findOneBy({id:playlistId});
    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }

    const songs = await this.songRepository
      .createQueryBuilder('song')
      .innerJoin('song.playlists', 'playlist')
      .where('playlist.id = :playlistId', { playlistId })
      .getMany();

    return songs.map(song => ({ id: song.id, title: song.title }))
  }

  async getPlaylistByOwner(ownerId):Promise<{id:number; name:string}[]>{

    const user = await this.userRepository.findOneBy({id:ownerId});
    console.log(ownerId);
    console.log(user);
    const pls = await this.playlistRepository.findBy({owner:user});
    
    return pls.map(playlist => ({id:playlist.id, name: playlist.name}))
  }
}
