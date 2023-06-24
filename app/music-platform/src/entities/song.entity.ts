// song.entity.ts
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

  @Column()
  duration: number;

  @Column({ type: 'bytea' })
  songData: Buffer;

  @ManyToMany(() => Playlist, playlist => playlist.songs)
  @JoinTable()
  playlists: Playlist[];
}
