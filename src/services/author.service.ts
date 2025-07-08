import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Author } from "src/entities/author.entity";
import { PostEntity } from "src/entities/post.entity";
import { CreateAuthorDto } from "src/dto/create.signup.dto";
import * as bcrypt from 'bcrypt';
import { Console } from "console";
@Injectable()

export class AuthorService{

    constructor(
        @InjectRepository(Author)
        private authorRepository : Repository<Author>

    ){}

    // register user

    async register(createUserDto: CreateAuthorDto): Promise<Author> {
        const { username, email, password } = createUserDto;
    
        const existingByEmail = await this.authorRepository.findOne({ where:{ email }});
        const existingByusername = await this.authorRepository.findOne({ where:{username}})
        if (existingByEmail || existingByusername) {
          throw new ConflictException('Username or email already taken');
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.authorRepository.create({
          username,
          email,
          password: hashedPassword,
        });
    
        return this.authorRepository.save(user);
      }
    
    async create(authorData: Partial<Author>): Promise<Author>{
        const author = this.authorRepository.create(authorData);
        return this.authorRepository.save(author);
    }
    // get the users/authors that are registered
    // async getAll(): Promise<Partial<Author>[]>{
    //     const authors = await this.authorRepository.find();
    //     // avoid returning password
        
    //     return authors.map(({password, ...rest})=> rest);
    // }
    // find all users, without password!
    async findAll(): Promise<Partial<Author>[]>{
        console.log("return the author");
        const author = await this.authorRepository.find();
        // const {password, ...rest} = author;
        return author.map(({ password, ...rest }) => rest);
        // return this.authorRepository.find();
        // return rest;

    }
    // get the author using id
    async findOne(id: number): Promise<Partial<Author>>{
        const author = await this.authorRepository.findOne({
            where: {id}
        });
        if(!author){
            throw new NotFoundException(`Author with id ${id} not found!`)
        }
        // exclude the password when returning author.
        const {password, ...rest} = author;
        console.log('Returning author:', rest);
        
        return rest;
        // return author;
    }

}   