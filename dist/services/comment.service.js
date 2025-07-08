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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("../entities/comment.entity");
const post_entity_1 = require("../entities/post.entity");
const author_entity_1 = require("../entities/author.entity");
const class_transformer_1 = require("class-transformer");
let CommentsService = class CommentsService {
    constructor(commentRepo, postRepo, userRepo) {
        this.commentRepo = commentRepo;
        this.postRepo = postRepo;
        this.userRepo = userRepo;
    }
    async create(dto) {
        const post = await this.postRepo.findOne({ where: { id: dto.postId } });
        const author = await this.userRepo.findOne({ where: { id: dto.authorId } });
        let finalAuthor = null;
        if (dto.authorId) {
            finalAuthor = await this.userRepo.findOne({
                where: { id: dto.authorId }
            });
        }
        if (!finalAuthor) {
            if (!dto.authorName) {
                throw new common_1.NotFoundException("Author not found. Please register yourself!");
            }
            const newAuthor = this.userRepo.create({ username: dto.authorName });
            finalAuthor = await this.userRepo.save(newAuthor);
        }
        let parent = undefined;
        if (typeof (dto.parentId) != undefined && dto.parentId != undefined && dto.parentId > 0) {
            const foundParent = await this.commentRepo.findOne({ where: { id: dto.parentId }
            });
            if (!foundParent) {
                throw new common_1.NotFoundException("parent comment not found");
            }
            parent = foundParent;
        }
        if (!post) {
            throw new common_1.NotFoundException("Post not found");
        }
        const comment = this.commentRepo.create({
            content: dto.content,
            post,
            author: finalAuthor,
            parent,
        });
        console.log('Comment before save', comment);
        return this.commentRepo.save(comment);
    }
    async findOne(id) {
        const comment = await this.commentRepo.findOne({
            where: { id },
            relations: ["author", "comment"],
        });
        if (!comment) {
            throw new common_1.NotFoundException(`Comment with id ${id} not found`);
        }
        return this.loadReplies(comment);
    }
    async loadReplies(comment) {
        const replies = await this.commentRepo.find({
            where: { parent: { id: comment.id } },
            relations: ["post", "author"],
            order: { createdAt: "ASC" },
        });
        return (0, class_transformer_1.instanceToPlain)({
            id: comment.id,
            content: comment.content,
            createdAt: comment.createdAt,
            author: comment.author,
            post: comment.post,
            replies: await Promise.all(replies.map((reply) => this.loadReplies(reply))),
        });
    }
    async findAll() {
        return this.commentRepo.find({
            relations: ["post", "parent", "replies"],
            order: { createdAt: "ASC" },
        });
    }
    async getThreadedComments(postId) {
        console.log("Get Threaded comments for postId", postId);
        const topComments = await this.commentRepo.find({
            where: {
                post: { id: postId },
            },
            relations: ["post", "author"],
            order: { createdAt: "ASC" },
        });
        console.log("Top Comments", topComments);
        return Promise.all(topComments.map((comment) => this.loadReplies(comment)));
    }
    async update(id, content) {
        const comment = await this.commentRepo.findOne({ where: { id } });
        if (!comment) {
            throw new common_1.NotFoundException(`Comment with id ${id} not found`);
        }
        const now = new Date();
        const createdAt = new Date(comment.createdAt);
        const diffMs = now.getTime() - createdAt.getTime();
        const diffMinutes = diffMs / (1000 * 60);
        if (diffMinutes > 15) {
            throw new common_1.NotFoundException(`Edit period expired for comment with id ${id}`);
        }
        comment.content = content;
        return this.commentRepo.save(comment);
    }
    async delete(id) {
        const comment = await this.commentRepo.findOne({ where: { id } });
        if (!comment) {
            throw new common_1.NotFoundException(`Alas! Comment with id ${id} not found`);
        }
        comment.deletedAt = new Date();
        await this.commentRepo.save(comment);
    }
    async restore(id) {
        const comment = await this.commentRepo.findOne({ where: { id },
            withDeleted: true });
        console.log("You are trying to restore the current id ", id);
        if (!comment) {
            throw new common_1.NotFoundException(`Comment with id ${id} not found`);
        }
        if (!comment.deletedAt) {
            throw new common_1.NotFoundException(`Comment with id ${id} is not deleted`);
        }
        const now = new Date();
        const deletedAt = new Date(comment.deletedAt);
        const diffMs = now.getTime() - deletedAt.getTime();
        const diffMinutes = diffMs / (1000 * 60);
        if (diffMinutes > 15) {
            throw new common_1.NotFoundException(`Restore period expired for comment with id ${id}`);
        }
        console.log(`We are trying to log your comment id ${id}`);
        await this.commentRepo.restore(id);
        const restored = await this.commentRepo.findOne({
            where: { id }
        });
        if (!restored) {
            throw new common_1.NotFoundException("error restoring comment of id");
        }
        console.log("We are set to restore your comment", comment);
        return restored;
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __param(1, (0, typeorm_1.InjectRepository)(post_entity_1.PostEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(author_entity_1.Author)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CommentsService);
//# sourceMappingURL=comment.service.js.map