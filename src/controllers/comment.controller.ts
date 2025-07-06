// src/comments/comments.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  Put,
  Delete,
} from "@nestjs/common";
import { CommentsService } from "./../services/comment.service";
import { CreateCommentDto } from "../dto/create.comment.dto";
import { Comment } from "../entities/comment.entity";
import { dot } from "node:test/reporters";
@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() dto: CreateCommentDto): Promise<Comment> {
    console.log(dto)
    return await this.commentsService.create(dto);
  } // this is like creating a first child of a post

  // Creating a reply or a comment for a specific post
  @Post(":postId")
  // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createForPost(
    @Param("postId", ParseIntPipe) postId: number,
    @Body() dto: CreateCommentDto
  ): Promise<Comment> {
    return this.commentsService.create({ ...dto, postId });
  }

  // Get all threaded comments for a post
  @Get("/post/:postId")
  getThreaded(@Param("postId", ParseIntPipe) postId: number) {
    console.log("Get comments of post ",postId);
    return this.commentsService.getThreadedComments(postId);
  }

  // getThreaded(@Param('postId') postId: number): Promise<Comment[]> {
  //   return this.commentsService.getThreadedComments(postId);
  // }

  // Update a comment
  @Put(":id")
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body("content") content: string
  ): Promise<Comment> {
    return this.commentsService.update(id, content);
  }

  // Delete a comment
  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.commentsService.delete(id);
    return { message: "Comment deleted successfully" };
  }

  // Restore a deleted comment within 15 minutes
  @Post(":id/restore")
  async restore(@Param("id", ParseIntPipe) id: number): Promise<Comment> {
    return this.commentsService.restore(id);
  }

  // Get a single comment by ID
  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.commentsService.findOne(id);
  }

  // Get all comments
  @Get()
  async findAll() {
    return this.commentsService.findAll();
  }
}
