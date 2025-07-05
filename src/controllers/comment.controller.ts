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

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() dto: CreateCommentDto): Promise<Comment> {
    return this.commentsService.create(dto);
  }
  @Get(":id")
  async getComment(@Param("id", ParseIntPipe) id: number): Promise<Comment> {
    return this.commentsService.findOne(id);
  }

  @Get("/post/:postId")
  getThreaded(@Param("postid", ParseIntPipe) postId: number) {
    return this.commentsService.getThreadedComments(postId);
  }
  // getThreaded(@Param('postId') postId: number): Promise<Comment[]> {
  //   return this.commentsService.getThreadedComments(postId);
  // }
}
