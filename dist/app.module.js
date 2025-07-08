"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const comment_module_1 = require("./modules/comment.module");
const author_module_1 = require("./modules/author.module");
const cors = require("cors");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(cors({
            origin: ['http://localhost:3000'],
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
            allowedHeaders: 'Content-Type',
        }))
            .forRoutes('/');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: "postgres",
                host: "localhost",
                port: 5432,
                username: "postgres",
                password: "ahsaan",
                database: "commentsdb1",
                autoLoadEntities: true,
                synchronize: true,
            }),
            comment_module_1.CommentsModule,
            author_module_1.AuthorModule
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map