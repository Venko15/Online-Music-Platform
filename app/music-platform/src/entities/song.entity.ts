// song.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.songs)
  owner: User;

  @Column()
  title: string;

  @Column()
  duration: number;

  @Column({ type: 'bytea' })
  songData: Buffer;
}
