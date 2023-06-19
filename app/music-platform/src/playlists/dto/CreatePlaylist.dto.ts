import { IsNotEmpty, IsString, IsArray, IsBoolean } from 'class-validator';

export class CreatePlaylistDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  private: boolean;

  @IsNotEmpty()
  @IsArray()
  songs: string[]; // Assuming the songs are referenced by their IDs
}
