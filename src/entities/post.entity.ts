import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from './user.entity';
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

  @ManyToOne(() => User, user => user.posts)
  author!: User;
  @OneToMany(() => PostEntity, (post) => post.author)
posts!: PostEntity[];


  @OneToMany(() => Comment, comment => comment.post)
  comments!: Comment[];
}