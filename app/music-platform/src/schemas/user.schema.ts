import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: 'ObjectId', ref: 'Song' }] })
  postedSongs: string[];

  @Prop({ type: [{ type: 'ObjectId', ref: 'Playlist' }] })
  playlists: string[];

}

export const UserSchema = SchemaFactory.createForClass(User);
