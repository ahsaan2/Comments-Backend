import { Comment } from '../comments/comment.entity';
export declare class Post {
    id: number;
    title: string;
    content: string;
    comments: Comment[];
}
