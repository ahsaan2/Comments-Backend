import { PostEntity } from './post.entity';
import { Author } from './author.entity';
export declare class Comment {
    id: number;
    content: string;
    createdAt: Date;
    deletedAt?: Date;
    post: PostEntity;
    author: Author;
    parent?: Comment;
    replies: Comment[];
}
