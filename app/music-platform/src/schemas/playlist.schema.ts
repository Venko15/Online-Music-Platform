import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlaylistDocument = Playlist & Document;

@Schema()
export class Playlist {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  private: boolean;

  @Prop({ type: [{ type: 'ObjectId', ref: 'Song' }] })
  songs: string[];

  @Prop({ required: true })
  ownerId: string;
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
