import { IsString, MinLength } from 'class-validator';

export class TournamentDTO {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  description: string;
}
