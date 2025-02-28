import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BlogsService } from './blogs.services';
import { Blog } from './blogs.entity';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  create(@Body() blog: Blog) {
    return this.blogsService.create(blog);
  }

  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.blogsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() blog: Partial<Blog>) {
    return this.blogsService.update(id, blog);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.blogsService.remove(id);
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
    return this.blogsService.findByCategory(category);
  }
}