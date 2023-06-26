import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { Playlist } from './playlist.entity';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.songs)
  owner: User;

  @Column({nullable:true})
  title: string;

  @Column('bytea')
  songData: Buffer;

  @Column()
  duration: number;

  @ManyToMany(() => Playlist, playlist => playlist.songs)
  @JoinTable()
  playlists: Playlist[];
}
