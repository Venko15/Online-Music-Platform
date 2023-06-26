import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
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
      const user = await this.userRepository.findOneBy({id:body.ownerId});
      const playlist = new Playlist();
      playlist.name = body.name;
      playlist.owner = user;
      // Save the playlist entity
      const savedPlaylist = await this.playlistRepository.save(playlist);
  
    
      // Retrieve the user's playlists
      const playlists = await this.playlistRepository.find({
        where: { owner: user },
        relations: ['songs']
      });
    
      // Update the user's playlists array
      user.playlists = playlists;
    
      // Add the new playlist to the user's playlists array
      user.playlists.push(savedPlaylist);
    
      // Save the user entity
      const savedUser = await this.userRepository.save(user);
    
      // Create a DTO for playlist data without circular references
      const playlistDto = {
        id: savedPlaylist.id,
        name: savedPlaylist.name,
        songs: savedPlaylist.songs,
        owner: {
          id: savedUser.id,
          username: savedUser.username
        }
      };
    
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
