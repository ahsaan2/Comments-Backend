import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentsModule } from "./modules/comment.module";
// src/comments/comments.module.ts
import { Comment } from "./entities/comment.entity";
import { PostEntity } from "./entities/post.entity";
import { Author } from "./entities/author.entity";
import { AuthorModule } from "./modules/author.module";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "ahsaan",
      database: "commentsdb1",
      
      autoLoadEntities: true,
      synchronize: true,
    }),
    CommentsModule,
    AuthorModule

  ],
})
export class AppModule {}
