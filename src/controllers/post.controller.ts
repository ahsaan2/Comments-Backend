import { PostDto, PostEntity } from "src/entities/post.entity";
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
import { createPostDto } from "../dto/create.post.dto";

@Controller("posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

    @Post()
    create(@Body() dto: PostDto): Promise<PostEntity> {
      console.log("DTO received:", dto);

      return this.postService.create(dto);
    }

    @Get(":id")
    async findOne(@Param("id", ParseIntPipe) id: number) {
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
