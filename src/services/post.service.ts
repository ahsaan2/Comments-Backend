import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostEntity, PostDto } from "src/entities/post.entity";
import { Repository } from "typeorm";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>
  ) {}

  async create(dto: PostDto): Promise<PostEntity> {
    // The parent(post/comment) should be valid before adding this comment.
    var post = await this.postRepository.save(dto);
    return post;
  }

  // find comment by id
  async findOne(id: number): Promise<PostEntity> {
    const postById = await this.postRepository.findOne({
      where: { id },
    });
    if (!postById) {
      throw new NotFoundException(`post with id ${id} is not found`);
    }
    return postById;
  }
}
