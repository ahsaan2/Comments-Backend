import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import { PostEntity } from './post.entity';
import { Author } from './author.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @CreateDateColumn()
  createdAt!: Date;  // set to the current time-stamp


  @DeleteDateColumn()
  deletedAt?: Date;   // will be deleted at the current time-stamp
  

  @ManyToOne(() => PostEntity, (post) => post.comments)
  post!: PostEntity;

  @ManyToOne(() => Author, (user) => user.id)
  author!: Author;

  @ManyToOne(() => Comment, (comment) => comment.replies, { nullable: true })
  @JoinColumn({ name: 'parentId' })
  parent?: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent)
  replies!: Comment[];
}
