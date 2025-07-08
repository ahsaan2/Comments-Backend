import { PostEntity } from "src/entities/post.entity";
import { PostService } from "src/services/post.service";
import {
  Controller,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from "@nestjs/common";
import { Get } from "@nestjs/common";
import { query } from "express";
import { CreatePostDto } from "../dto/create.post.dto";

@Controller("posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

    @Post()
    create(@Body() dto: CreatePostDto): Promise<PostEntity> {
      return this.postService.create(dto);
    }

    @Get(":id")
    async findOne(@Param("id", ParseIntPipe) id: number) {
      console.log('rendering the current post id',id);
      
      return this.postService.findOne(id);
    }
  //   @Get()
  //   getAll(): Promise<PostEntity[]> {
  //     return this.postService.findAll();
  //   }
  @Get()
  async findAll() {
    return this.postService.findAll();
  }

}
