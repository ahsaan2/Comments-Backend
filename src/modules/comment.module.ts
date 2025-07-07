import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from '../controllers/comment.controller';
import { CommentsService } from '../services/comment.service';
import { Comment } from '../entities/comment.entity';
import { PostEntity } from '../entities/post.entity';
import { Author } from '../entities/author.entity';
import { PostService } from 'src/services/post.service';
import { PostController } from 'src/controllers/post.controller';
// import { AuthorService } from 'src/services/author.service';
import { AuthorModule } from './author.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, PostEntity, Author])
, AuthorModule],
  controllers: [CommentsController,PostController],
  providers: [CommentsService,PostService],
})
export class CommentsModule {}
