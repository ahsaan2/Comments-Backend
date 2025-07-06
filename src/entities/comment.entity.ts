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
import { User } from './user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => PostEntity, (post) => post.comments)
  post!: PostEntity;

  @ManyToOne(() => User, (user) => user.comments)
  author!: User;

// Allow Top-Lvel comments 
  @ManyToOne(() => Comment, (comment) => comment.replies, { nullable: true })
  @JoinColumn({name:'parentId'})
  parent?: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent)
  replies!: Comment[];

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
