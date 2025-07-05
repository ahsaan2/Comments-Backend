import { Comment } from './comment.entity';
export declare class PostDto {
    title: string;
    content: string;
}
export declare class PostEntity {
    id: number;
    title: string;
    content: string;
    comments: Comment[];
}
