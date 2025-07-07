import { CreatePostDto } from "src/dto/create.post.dto";
import { PostEntity } from "src/entities/post.entity";
import { Repository } from "typeorm";
import { AuthorService } from "./author.service";
export declare class PostService {
    private readonly postRepository;
    private readonly authorRepository;
    constructor(postRepository: Repository<PostEntity>, authorRepository: AuthorService);
    create(dto: CreatePostDto): Promise<PostEntity>;
    findOne(id: number): Promise<PostEntity>;
    findAll(): Promise<PostEntity[]>;
}
