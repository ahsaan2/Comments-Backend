import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuthorService } from 'src/services/author.service';
import { CreateAuthorDto } from 'src/dto/create.author.dto';
import { Author } from 'src/entities/author.entity';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorService.create(createAuthorDto);
  }

  @Get()
  async findAll(): Promise<Author[]> {
    return this.authorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Author> {
    return this.authorService.findOne(id);
  }
}
