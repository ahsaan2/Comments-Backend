import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from '../controllers/comment.controller';
import { CommentsService } from '../services/comment.service';
import { Comment } from '../entities/comment.entity';
import { PostEntity } from '../entities/post.entity';
import { User } from '../entities/user.entity';
import { PostService } from 'src/services/post.service';
import { PostController } from 'src/controllers/post.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, PostEntity, User])],
  controllers: [CommentsController,PostController],
  providers: [CommentsService,PostService],
})
export class CommentsModule {}
