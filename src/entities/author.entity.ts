import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Comment } from './comment.entity';
import { Post } from '@nestjs/common';
import { PostEntity } from './post.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column({nullable: false})
  password !: string;

  @Column()
  email !: string;

  @OneToMany(() => PostEntity, (post) => post.author)
  posts!: PostEntity[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments!: Comment[];
}