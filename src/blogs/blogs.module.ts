import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './blogs.entity';
import { BlogsService } from './blogs.services';
import { BlogsController } from './blogs.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Blog])],
    controllers: [BlogsController],
    providers: [BlogsService],
})
export class BlogsModule {}
