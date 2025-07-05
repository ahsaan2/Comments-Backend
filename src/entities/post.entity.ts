import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Comment } from './comment.entity';

export class PostDto{
    title!: string;
    content!: string;
}

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @OneToMany(() => Comment,(comment:Comment) => comment.post)
  comments!: Comment[];
}