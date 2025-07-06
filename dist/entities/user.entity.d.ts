import { Comment } from './comment.entity';
import { PostEntity } from './post.entity';
export declare class User {
    id: number;
    username: string;
    posts: PostEntity[];
    comments: Comment[];
}
