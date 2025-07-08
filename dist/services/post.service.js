"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const post_entity_1 = require("../entities/post.entity");
const typeorm_2 = require("typeorm");
const author_service_1 = require("./author.service");
let PostService = class PostService {
    constructor(postRepository, authorRepository) {
        this.postRepository = postRepository;
        this.authorRepository = authorRepository;
    }
    async create(dto) {
        console.log('DTO received', dto);
        const author = await this.authorRepository.findOne(dto.authorId);
        if (!author) {
            throw new common_1.NotFoundException("Author not found!");
        }
        const post = this.postRepository.create({
            title: dto.title,
            content: dto.content,
            author: author
        });
        return this.postRepository.save(post);
    }
    async findOne(id) {
        const postById = await this.postRepository.findOne({
            where: { id },
            relations: ["comments", "author"],
        });
        if (!postById) {
            throw new common_1.NotFoundException(`post with id ${id} is not found`);
        }
        return postById;
    }
    findAll() {
        return this.postRepository.find();
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.PostEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        author_service_1.AuthorService])
], PostService);
//# sourceMappingURL=post.service.js.map