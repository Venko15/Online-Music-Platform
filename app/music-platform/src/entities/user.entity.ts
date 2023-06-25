import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Playlist } from './playlist.entity';
import { Song } from './song.entity';
import * as bcrypt from "bcryptjs"
@Entity({name:'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password:string;

  @OneToMany(() => Playlist, playlist => playlist.owner)
  playlists: Playlist[];

  @OneToMany(() => Song, song => song.owner)
  songs: Song[];

  @Column({nullable:true})
  refresh_token: string;



}
