import { Module} from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { PostEntity } from '../entities/post.entity';
// import { PostsController } from '../controllers/posts.controller';
import { PostController } from 'src/controllers/post.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  controllers: [PostController],
})
export class PostsModule {}
