import { Comment } from './comment.entity';
import { Author } from './author.entity';
export declare class PostEntity {
    id: number;
    title: string;
    content: string;
    author: Author;
    comments: Comment[];
}
