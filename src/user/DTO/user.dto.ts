import { Transform } from "class-transformer";
import { IsString } from "class-validator";

export class UserDTO {
    @IsString()
    @Transform(({ value }: { value: string }) => value.toLowerCase())
    username: string
    
    @IsString()
    password: string
}