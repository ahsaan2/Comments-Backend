import { IsString, IsNotEmpty, isNotEmpty} from 'class-validator';
export class createPostDto{
    @IsString()
    @IsNotEmpty()
    postTitle!: string;

    @IsString()
    @IsNotEmpty()
    content !: string;


}