import { Repository } from "typeorm";
import { Comment } from "src/entities/comment.entity";
import { PostEntity } from "src/entities/post.entity";
import { Author } from "src/entities/author.entity";
import { CreateCommentDto } from "src/dto/create.comment.dto";
export declare class CommentsService {
    private readonly commentRepo;
    private readonly postRepo;
    private readonly userRepo;
    constructor(commentRepo: Repository<Comment>, postRepo: Repository<PostEntity>, userRepo: Repository<Author>);
    create(dto: CreateCommentDto): Promise<Comment>;
    findOne(id: number): Promise<any>;
    private loadReplies;
    findAll(): Promise<Comment[]>;
    getFlatComments(postId: number): Promise<any[]>;
    getThreadedComments(postId: number): Promise<any[]>;
    update(id: number, content: string): Promise<Comment>;
    delete(id: number): Promise<void>;
    restore(id: number): Promise<Comment>;
}
