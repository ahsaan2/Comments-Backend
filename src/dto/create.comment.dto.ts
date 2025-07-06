import { IsString, IsNotEmpty, IsInt, IsOptional } from "class-validator";

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsInt()
  postId!: number;

  @IsInt()
  authorId!: number;
  @IsInt()
  @IsOptional()
  parentId?: number;
}

/**
 * DTO -->> (Data Transfer Object) is a design pattern used to define the structure of data that is
 * sent between different parts of an application, Particularly the client and the server
 * DTO's are typically used to validate and transform data, ensuring it confroms to a specific format
 * before being processed.
 *
 */
