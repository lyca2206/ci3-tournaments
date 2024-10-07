import { Transform } from "class-transformer";
import { IsString, MinLength,IsNumber } from "class-validator";
export class UpdateGroupDto {
    @IsString()
    @Transform(({ value }: { value: string }) => value.toLowerCase())
    @MinLength(3)
    name?: string;
    
    @IsNumber()
    seeding?: number;
}
