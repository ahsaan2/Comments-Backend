import { Repository } from "typeorm";
import { Author } from "src/entities/author.entity";
export declare class UserService {
    private readonly authorRepo;
    constructor(authorRepo: Repository<Author>);
    create(authorData: Partial<Author>): Promise<Author>;
    findAll(): Promise<Author[]>;
    findOne(id: number): Promise<Author>;
}
