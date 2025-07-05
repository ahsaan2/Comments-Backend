import { PostDto, PostEntity } from "src/entities/post.entity";
import { PostService } from "src/services/post.service";
import { Controller, Post, Body,  Param, Query, ParseIntPipe } from '@nestjs/common';
import { Get } from "@nestjs/common";
import { query } from "express";

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() dto: PostDto): Promise<PostEntity> {
    return this.postService.create(dto);
  }

 @Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.postService.findOne(id);
}

}