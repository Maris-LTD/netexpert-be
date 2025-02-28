import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blogs.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}

  async create(blog: Blog): Promise<Blog> {
    return this.blogRepository.save(blog);
  }

  async findAll(): Promise<Blog[]> {
    return this.blogRepository.find();
  }

  async findOne(id: number): Promise<Blog> {
    const blog = await this.blogRepository.findOne({where: {id: BigInt(id)}});
    if (!blog) {
      throw new Error('Blog not found');
    }
    return blog;
  }

  async findByCategory(category: string): Promise<Blog[]> {
    return this.blogRepository.find({where: {category: category}});
  }

  async update(id: number, blog: Partial<Blog>): Promise<void> {
    await this.blogRepository.update(id, blog);
  }

  async remove(id: number): Promise<void> {
    await this.blogRepository.delete(id);
  }
}