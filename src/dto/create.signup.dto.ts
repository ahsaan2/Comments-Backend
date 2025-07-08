import { IsEmail, IsNotEmpty, IsString, min, MinLength } from "class-validator";
export class CreateAuthorDto{
    @IsNotEmpty()
    @IsString()
    username!: string;

    @IsEmail()
    @IsNotEmpty()
    email !: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password !: string;
}
// Implement the sign-up now in the  services