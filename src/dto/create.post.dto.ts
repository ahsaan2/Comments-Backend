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

    @IsNotEmpty()  // since we are registering author, we can keep it optional
    authorName?: string;
}