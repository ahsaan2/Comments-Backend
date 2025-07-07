import { PostEntity } from "src/entities/post.entity";
import { PostService } from "src/services/post.service";
import { CreatePostDto } from "../dto/create.post.dto";
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(dto: CreatePostDto): Promise<PostEntity>;
    findOne(id: number): Promise<PostEntity>;
    findAll(): Promise<PostEntity[]>;
}
