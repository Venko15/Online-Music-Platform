import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSongDto {
  @IsNotEmpty()

  name;

  @IsNotEmpty()

  payload;

  @IsNotEmpty()

  postedAt;

}