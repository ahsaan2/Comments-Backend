import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Comment } from './comment.entity';
import { Author } from './author.entity';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @ManyToOne(() => Author, (user) => user.id, {eager: false})
  @JoinColumn({
    name: 'authorId'
  })
  author!: Author;

  // @Column({nullable: false})
  // authorId!: number;


  @OneToMany(() => Comment, comment => comment.post)
  comments!: Comment[];
}