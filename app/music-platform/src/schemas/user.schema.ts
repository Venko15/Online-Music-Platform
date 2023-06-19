import { Schema, Document, model } from 'mongoose';

export interface User extends Document {
  _id: string;
  name: string;
  password:string;
  songs:string[];
  playlists:string[]
  refresh_token:string
}

const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  password: { type: String, required: true },
  songs: {type: [],required:true},
  playlists: {type: [],required:true},
  refresh_token: {type: String}
});

export const UserModel = model<User>('User', UserSchema);
