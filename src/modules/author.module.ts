// src/author/author.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from 'src/entities/author.entity';
import { AuthorService } from 'src/services/author.service';
import { AuthorController } from 'src/controllers/AuthorController';
@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [AuthorService],
  controllers: [AuthorController],
  exports: [AuthorService] 
})
export class AuthorModule {}
