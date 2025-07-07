import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Author } from "src/entities/author.entity";
import { PostEntity } from "src/entities/post.entity";

@Injectable()

export class AuthorService{

    constructor(
        @InjectRepository(Author)
        private readonly authorRepository : Repository<Author>

    ){}

    // 
    async create(authorData: Partial<Author>): Promise<Author>{
        const author = this.authorRepository.create(authorData);
        return this.authorRepository.save(author);
    }

    async findAll(): Promise<Author[]>{
        return this.authorRepository.find();

    }
    async findOne(id: number): Promise<Author>{
        const author = await this.authorRepository.findOne({
            where: {id}
        });
        if(!author){
            throw new NotFoundException(`Author with id ${id} not found!`)
        }
        return author;
    }

}   