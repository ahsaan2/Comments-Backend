import { Comment } from './comment.entity';
import { User } from './user.entity';
export declare class PostDto {
    title: string;
    content: string;
}
export declare class PostEntity {
    id: number;
    title: string;
    content: string;
    author: User;
    posts: PostEntity[];
    comments: Comment[];
}
