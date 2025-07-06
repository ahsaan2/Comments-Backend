import { CommentsService } from "./../services/comment.service";
import { CreateCommentDto } from "../dto/create.comment.dto";
import { Comment } from "../entities/comment.entity";
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(dto: CreateCommentDto): Promise<Comment>;
    createForPost(postId: number, dto: CreateCommentDto): Promise<Comment>;
    getByPost(postId: number): Promise<any[]>;
    getThreaded(postId: number): Promise<any[]>;
}
