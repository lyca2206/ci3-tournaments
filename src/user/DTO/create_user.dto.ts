import { IsString, Matches, MinLength } from "class-validator";

export class CreateUserDTO {
    @IsString()
    @MinLength(3)
    username: string
    
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}/, { message: "Weak Password." })
    password: string
}