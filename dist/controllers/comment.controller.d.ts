import { CommentsService } from "./../services/comment.service";
import { CreateCommentDto } from "../dto/create.comment.dto";
import { Comment } from "../entities/comment.entity";
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(dto: CreateCommentDto): Promise<Comment>;
    getComment(id: number): Promise<Comment>;
    getThreaded(postId: number): Promise<any[]>;
}
