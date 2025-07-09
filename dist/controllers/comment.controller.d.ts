import { CommentsService } from "./../services/comment.service";
import { CreateCommentDto } from "../dto/create.comment.dto";
import { Comment } from "../entities/comment.entity";
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(dto: CreateCommentDto): Promise<Comment>;
    createForPost(postId: number, dto: CreateCommentDto): Promise<Comment>;
    getFlat(postId: number): Promise<any[]>;
    getThreaded(postId: number): Promise<any[] | {
        message: string;
    }>;
    update(id: number, content: string): Promise<Comment>;
    delete(id: number): Promise<{
        message: string;
    }>;
    restore(id: number): Promise<Comment>;
    findOne(id: number): Promise<any>;
    findAll(): Promise<Comment[]>;
}
