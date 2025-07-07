import { IsString, IsNotEmpty, isNotEmpty, IsInt} from 'class-validator';

export class CreatePostDto{
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    content !: string;

    @IsInt()
    authorId !: number;

    @IsNotEmpty()
    authorName!: string;
}