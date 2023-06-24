// playlist.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { Song } from './song.entity';

@Entity('playlists')
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.playlists)
  owner: User;

  @Column()
  name: string;

  @ManyToMany(() => Song, song => song.playlists)
  @JoinTable()
  songs: Song[];

}
