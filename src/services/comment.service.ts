import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, IsNull, MoreThan } from "typeorm";
import { Comment } from "src/entities/comment.entity";
import { PostEntity } from "src/entities/post.entity";
import { User } from "src/entities/user.entity";
import { CreateCommentDto } from "src/dto/create.comment.dto";
import { log } from "node:console";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,

    @InjectRepository(PostEntity)
    private readonly postRepo: Repository<PostEntity>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  
async create(dto: CreateCommentDto): Promise<Comment> {
  // console.log('Received dto', dto);
  
  const post = await this.postRepo.findOne({ where: { id: dto.postId } });
  const author = await this.userRepo.findOne({ where: { id: dto.authorId } });

  if (!post || !author) {
    throw new NotFoundException("Post or author not found");
  }

  let parent: Comment | undefined = undefined;

  if (dto.parentId) {
    const foundParent = await this.commentRepo.findOne({ where: { id: dto.parentId } });
    if (!foundParent) {
      throw new NotFoundException("parent comment not found");
    }
  }

  const comment = this.commentRepo.create({
    content: dto.content,
    post,
    author,
    parent,
    // ...(parent && { parent }), // add parent only if it exists
  });
  console.log('Comment before save', comment);
  
  return await this.commentRepo.save(comment);
}

  async findOne(id: number): Promise<any> {
    const comment = await this.commentRepo.findOne({
      where: { id },
      relations: ["author", "post", "parent", "replies"],
    });

    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    return this.loadReplies(comment);
  }

  // Recursive function to get nested replies
  private async loadReplies(comment: Comment): Promise<any> {
    const replies = await this.commentRepo.find({
      where: { parent: { id: comment.id } },
      relations: ["author", "post"],
      order: { createdAt: "ASC" },
    });

    return {
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      author: comment.author,
      post: comment.post,
      replies: await Promise.all(
        replies.map((reply) => this.loadReplies(reply))
      ),
    };
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepo.find({
      relations: ["author", "post", "parent", "replies"],
      order: { createdAt: "ASC" },
    });
  }

  // Fetch all top-level comments with nested replies for a post
  async getThreadedComments(postId: number): Promise<any[]> {
    const topComments = await this.commentRepo.find({
      where: {
        post: { id: postId },
        parent: IsNull(),
      },
      relations: ["author", "post"],
      order: { createdAt: "ASC" },
    });

    return Promise.all(topComments.map((comment) => this.loadReplies(comment)));
  }

  async update(id: number, content: string): Promise<Comment> {
    const comment = await this.commentRepo.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
    // Restrict editing to within 15 minutes of creation
    const now = new Date();
    const createdAt = new Date(comment.createdAt);
    const diffMs = now.getTime() - createdAt.getTime();
    const diffMinutes = diffMs / (1000 * 60);
    if (diffMinutes > 15) {
      throw new NotFoundException(`Edit period expired for comment with id ${id}`);
    }
    comment.content = content;
    return this.commentRepo.save(comment);
  }

  async delete(id: number): Promise<void> {
    const comment = await this.commentRepo.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
    comment.deletedAt = new Date();
    await this.commentRepo.save(comment);
  }

  async restore(id: number): Promise<Comment> {
    const comment = await this.commentRepo.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
    if (!comment.deletedAt) {
      throw new NotFoundException(`Comment with id ${id} is not deleted`);
    }
    const now = new Date();
    const deletedAt = new Date(comment.deletedAt);
    const diffMs = now.getTime() - deletedAt.getTime();
    const diffMinutes = diffMs / (1000 * 60);
    if (diffMinutes > 15) {
      throw new NotFoundException(`Restore period expired for comment with id ${id}`);
    }
    comment.deletedAt = undefined;
    return this.commentRepo.save(comment);
  }
}