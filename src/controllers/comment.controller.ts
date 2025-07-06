// src/comments/comments.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { CommentsService } from "./../services/comment.service";
import { CreateCommentDto } from "../dto/create.comment.dto";
import { Comment } from "../entities/comment.entity";
import { dot } from "node:test/reporters";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() dto: CreateCommentDto): Promise<Comment> {
    console.log("DTO in controller:", dto);
    return this.commentsService.create(dto);
  }
  // creating a reply to a particular id
  @Post("/:postid")
  async createForPost(
    @Param("postId") postId: number,
    @Body() dto: CreateCommentDto
  ): Promise<Comment> {
    return this.commentsService.create({ ...dto, postId });
  }
  @Get("post/postId")
  getByPost(@Param("postId", ParseIntPipe) postId: number) {
    return this.commentsService.getThreadedComments(postId);
  }

  @Get("/post/:postId")
  getThreaded(@Param("postId", ParseIntPipe) postId: number) {
    return this.commentsService.getThreadedComments(postId);
  }
  // getThreaded(@Param('postId') postId: number): Promise<Comment[]> {
  //   return this.commentsService.getThreadedComments(postId);
  // }
}
