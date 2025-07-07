import { Module} from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { PostEntity } from '../entities/post.entity';
// import { PostsController } from '../controllers/posts.controller';
import { PostController } from 'src/controllers/post.controller';
// import { AuthorModule } from 'src/author/author.module';
import { AuthorModule } from './author.module';
import { PostService } from 'src/services/post.service';
@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), AuthorModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostsModule {}
