import { Controller, Post, Body, Get, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthorService } from 'src/services/author.service';
import { Author } from 'src/entities/author.entity';
// import { AuthService } from 'src/services/auth.service';
import { CreateAuthorDto } from 'src/dto/create.signup.dto';
@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorService.create(createAuthorDto);
  }

    // register a user request
    @Post('register')
    @UsePipes(new ValidationPipe({ whitelist: true}))
    async register(@Body() dto: CreateAuthorDto){
      return this.authorService.register(dto);
    }

// Login for a user
  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))  
  async login(@Body('email') email: string, @Body('password') password: string): Promise<Partial<Author>> {
    return this.authorService.login(email, password);
  }

  @Get()
  async findAll(): Promise<Partial<Author>[]> {
    return this.authorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Partial<Author>> {
    return this.authorService.findOne(id);
  }
}
