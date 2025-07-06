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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostEntity = exports.PostDto = void 0;
const typeorm_1 = require("typeorm");
const comment_entity_1 = require("./comment.entity");
const user_entity_1 = require("./user.entity");
class PostDto {
}
exports.PostDto = PostDto;
let PostEntity = class PostEntity {
};
exports.PostEntity = PostEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PostEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PostEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PostEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.posts),
    __metadata("design:type", user_entity_1.User)
], PostEntity.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PostEntity, (post) => post.author),
    __metadata("design:type", Array)
], PostEntity.prototype, "posts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, comment => comment.post),
    __metadata("design:type", Array)
], PostEntity.prototype, "comments", void 0);
exports.PostEntity = PostEntity = __decorate([
    (0, typeorm_1.Entity)()
], PostEntity);
//# sourceMappingURL=post.entity.js.map