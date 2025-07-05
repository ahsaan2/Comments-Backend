import { Repository } from "typeorm";
import { Comment } from "src/entities/comment.entity";
import { PostEntity } from "src/entities/post.entity";
import { User } from "src/entities/user.entity";
import { CreateCommentDto } from "src/dto/create.comment.dto";
export declare class CommentsService {
    private readonly commentRepo;
    private readonly postRepo;
    private readonly userRepo;
    constructor(commentRepo: Repository<Comment>, postRepo: Repository<PostEntity>, userRepo: Repository<User>);
    create(dto: CreateCommentDto): Promise<Comment>;
    findOne(id: number): Promise<any>;
    private loadReplies;
    findAll(): Promise<Comment[]>;
    getThreadedComments(postId: number): Promise<any[]>;
}
