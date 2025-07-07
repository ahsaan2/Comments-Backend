import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Console } from "console";
import { title } from "process";
import { CreatePostDto } from "src/dto/create.post.dto";
import { PostEntity } from "src/entities/post.entity";
import { Repository } from "typeorm";
// import {Author} from "src/entities/author.entity"
import { AuthorService } from "./author.service";
// import {}
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,

    private readonly authorRepository: AuthorService
  ) {}

  async create(dto: CreatePostDto): Promise<PostEntity> {
    console.log('DTO received', dto);
    
    // The parent(post/comment) should be valid before adding this comment.
    // var post = await this.postRepository.save(dto);
    // const user = await this.postRepository.findOne({ 
    //   where: {id: dto.authorId},
    // relations: ['author']});

   const author = await this.authorRepository.findOne(dto.authorId)

    

    if(!author){
      throw new NotFoundException("Author not found!")
      
    }
    const post = this.postRepository.create({
      title : dto.title,
      content: dto.content,
      author : author
    })
    // return post;
    return this.postRepository.save(post)
  }

  // find comment by id
  async findOne(id: number): Promise<PostEntity> {
    const postById = await this.postRepository.findOne({
      where: { id },
      // changed to get author name
      relations: ["post", "parent", "replies", "author"],
    });
    if (!postById) {
      throw new NotFoundException(`post with id ${id} is not found`);
    }
    return postById;
  }
  findAll(): Promise<PostEntity[]>{
    return this.postRepository.find();
  }
}
