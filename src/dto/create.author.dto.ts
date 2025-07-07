import { Column, PrimaryGeneratedColumn } from "typeorm";

// If authorId exists, use it, if it does not-create a new one with author id and username

export class CreateAuthorDto{
    content!: string;
    postId !: number;
    authorId!:number;
    username ?:string;
    parentid ?: number



}