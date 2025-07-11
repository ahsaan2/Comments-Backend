"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const comment_controller_1 = require("../controllers/comment.controller");
const comment_service_1 = require("../services/comment.service");
const comment_entity_1 = require("../entities/comment.entity");
const post_entity_1 = require("../entities/post.entity");
const author_entity_1 = require("../entities/author.entity");
const post_service_1 = require("../services/post.service");
const post_controller_1 = require("../controllers/post.controller");
const author_module_1 = require("./author.module");
let CommentsModule = class CommentsModule {
};
exports.CommentsModule = CommentsModule;
exports.CommentsModule = CommentsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([comment_entity_1.Comment, post_entity_1.PostEntity, author_entity_1.Author]),
            author_module_1.AuthorModule],
        controllers: [comment_controller_1.CommentsController, post_controller_1.PostController],
        providers: [comment_service_1.CommentsService, post_service_1.PostService],
    })
], CommentsModule);
//# sourceMappingURL=comment.module.js.map