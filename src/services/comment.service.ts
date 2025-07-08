import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, IsNull, MoreThan, Auth } from "typeorm";
import { Comment } from "src/entities/comment.entity";
import { PostEntity } from "src/entities/post.entity";
import { Author } from "src/entities/author.entity";
import { CreateCommentDto } from "src/dto/create.comment.dto";
import { log, timeStamp } from "node:console";
import { instanceToPlain  } from "class-transformer"
@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,

    @InjectRepository(PostEntity)
    private readonly postRepo: Repository<PostEntity>,

    @InjectRepository(Author)
    private readonly userRepo: Repository<Author>
  ) {}

  
async create(dto: CreateCommentDto): Promise<Comment> {

  // Checking if there is a post with postId
  const post = await this.postRepo.findOne({ where: { id: dto.postId } });
  const author = await this.userRepo.findOne({ where: {id : dto.authorId}})
  // const authorName = await this.userRepo.findOne({where: {authorName : dto.authorName}})
  let finalAuthor : Author | null = null;
  // check if the author and the authorname is present
  if(dto.authorId){
    finalAuthor = await this.userRepo.findOne({
      where: {id: dto.authorId}
    })
  }

  if(!finalAuthor){
    if(!dto.authorName){
      throw new NotFoundException("Author not found. Please register yourself!")
    }
    
   // create new author
  const newAuthor = this.userRepo.create({username: dto.authorName});
  finalAuthor = await this.userRepo.save(newAuthor);
  
  //@TODO Check for author validation
  // const author = new User();
  //await this.userRepo.findOne({ where: { id: dto.authorId } });

  // console.log("Author",author);

  // if(!author){
  //   throw new NotFoundException("Author not found!")
  }

  let parent: Comment | undefined = undefined;

  if (typeof(dto.parentId) != undefined && dto.parentId != undefined && dto.parentId > 0) {
    const foundParent = await this.commentRepo.findOne({ where: { id: dto.parentId }
    
   });
    if (!foundParent) {
      throw new NotFoundException("parent comment not found");
    }
    parent = foundParent;
  }

  

  if (!post) {
    throw new NotFoundException("Post not found");
  }


 const comment = this.commentRepo.create({
  content: dto.content,
  post,
  author: finalAuthor,
  parent,
});

  console.log('Comment before save', comment);
  
  return this.commentRepo.save(comment);
  // return instanceToPlain(await this.commentRepo.save(comment))
}
 
  async findOne(id: number): Promise<any> {
    const comment = await this.commentRepo.findOne({
      where: { id },
      // every time we load the replies, these things should be present, added author here
      // relations: ["post", "parent", "replies", "author"],
      relations: ["author", "comment"],
    });

    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    return this.loadReplies(comment);
  }

  // Recursive function to get nested replies
  private async loadReplies(comment: Comment): Promise<any> {
    const replies = await this.commentRepo.find({
      where: { parent: { id: comment.id } },
      relations: ["post", "author"],
      order: { createdAt: "ASC" },
    });

    return instanceToPlain({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      author: comment.author,
      post: comment.post,
      replies: await Promise.all(
        replies.map((reply) => this.loadReplies(reply))
      ),
    });
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepo.find({
      relations: ["post", "parent", "replies"],
      order: { createdAt: "ASC" },
    });
  }

  // Fetch all top-level comments with nested replies for a post
  async getThreadedComments(postId: number): Promise<any[]> {
    console.log("Get Threaded comments for postId",postId);

    // Direct childs of the post
    const topComments = await this.commentRepo.find({
      where: {
        post: { id: postId },
        parent: IsNull(),
      },
      relations: ["post", "author"],
      order: { createdAt: "ASC" },
    });
    console.log("Top Comments",topComments)
    return Promise.all(topComments.map((comment) => this.loadReplies(comment)));
  }

  async update(id: number, content: string): Promise<Comment> {
    const comment = await this.commentRepo.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
    // Restrict editing to within 15 minutes of creation
    const now = new Date();
    const createdAt = new Date(comment.createdAt);
    const diffMs = now.getTime() - createdAt.getTime();
    const diffMinutes = diffMs / (1000 * 60);
    if (diffMinutes > 15) {
      throw new NotFoundException(`Edit period expired for comment with id ${id}`);
    }
    comment.content = content;
    return this.commentRepo.save(comment);
  }

  async delete(id: number): Promise<void> {
    const comment = await this.commentRepo.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException(`Alas! Comment with id ${id} not found`);
    }
    comment.deletedAt = new Date();
    await this.commentRepo.save(comment);
  }

  async restore(id: number): Promise<Comment> {
    const comment = await this.commentRepo.findOne({ where: { id } 
    ,
    withDeleted: true});

    console.log("You are trying to restore the current id ", id)
    // Soft-delete -->> the row is not removed from the db but  deletedAt is set.

    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
    if (!comment.deletedAt) {
      throw new NotFoundException(`Comment with id ${id} is not deleted`);
    }
    const now = new Date();
    const deletedAt = new Date(comment.deletedAt);
    const diffMs = now.getTime() - deletedAt.getTime();
    const diffMinutes = diffMs / (1000 * 60);
    if (diffMinutes > 15) {
      throw new NotFoundException(`Restore period expired for comment with id ${id}`);
    }
    console.log(`We are trying to log your comment id ${id}`);
    
    // comment.deletedAt = undefined;
    await this.commentRepo.restore(id)
    // get the comment
    const restored = await this.commentRepo.findOne({
      where: {id}
    })
    if(!restored){
      throw new NotFoundException("error restoring comment of id")
    }
    console.log("We are set to restore your comment", comment)
    
    return restored;
    // return this.commentRepo.save(comment);
  }
}