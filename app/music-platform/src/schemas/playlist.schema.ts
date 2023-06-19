import { Schema, Document, model } from 'mongoose';

export interface Playlist extends Document {
  _id: string;
  name: string;
  songs:string[];
  ownerId: string;
}

const PlaylistSchema = new Schema<Playlist>({
  name: { type: String, required: true },
  songs: {type: [],required:true},
  ownerId: { type: String }
});

export const PlaylistModel = model<Playlist>('User', PlaylistSchema);
