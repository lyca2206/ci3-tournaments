import { Transform } from 'class-transformer';
import { IsString, MinLength, IsNumber } from 'class-validator';
export class CreateGroupDto {
  @IsString()
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  @MinLength(3)
  name: string;

  @IsNumber()
  seeding: number;

  @MinLength(20)
  @IsString()
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  tournamentId: string;
}
