import { PostEntity } from './post.entity';
import { User } from './user.entity';
export declare class Comment {
    id: number;
    content: string;
    createdAt: Date;
    post: PostEntity;
    author: User;
    parent: Comment;
    replies: Comment[];
}
