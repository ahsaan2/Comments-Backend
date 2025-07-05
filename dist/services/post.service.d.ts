import { PostEntity, PostDto } from "src/entities/post.entity";
import { Repository } from "typeorm";
export declare class PostService {
    private readonly postRepository;
    constructor(postRepository: Repository<PostEntity>);
    create(dto: PostDto): Promise<PostEntity>;
    findOne(id: number): Promise<PostEntity>;
}
