import { Schema, Document, model } from 'mongoose';

export interface Song extends Document {
  _id: string;
  name: string;
  file:JSON;
  ownerId: string;
}

const SongSchema = new Schema<Song>({
  name: { type: String, required: true },
  file: {type: JSON,required:true},
  ownerId: { type: String },
});

export const SongModel = model<Song>('Song', SongSchema);
