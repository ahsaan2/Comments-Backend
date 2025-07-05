import { Post } from '../posts/post.entity';
import { User } from '../users/user.entity';
export declare class Comment {
    id: number;
    content: string;
    createdAt: Date;
    post: Post;
    author: User;
    parent: Comment;
    replies: Comment[];
}
