import { PostDto, PostEntity } from "src/entities/post.entity";
import { PostService } from "src/services/post.service";
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(dto: PostDto): Promise<PostEntity>;
    findOne(id: number): Promise<PostEntity>;
}
