import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(3)
  password: string;
}
