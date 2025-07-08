import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentsModule } from "./modules/comment.module";
// src/comments/comments.module.ts
import { Comment } from "./entities/comment.entity";
import { PostEntity } from "./entities/post.entity";
import { Author } from "./entities/author.entity";
import { AuthorModule } from "./modules/author.module";
import * as cors from 'cors'; // Import CORS middleware

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

export class AppModule implements NestModule { // Implement NestModule
  configure(consumer: MiddlewareConsumer) { // Implement the configure method
    consumer
      .apply(cors({ 
        origin: ['http://localhost:3000'], // Specify allowed origin(s)
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
        credentials: true, // Allow cookies and authentication headers if needed
        allowedHeaders: 'Content-Type', // Specify allowed headers
      }))
      .forRoutes('/'); // Apply CORS to routes within this module
  }
}

