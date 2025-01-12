import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/users-service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,

        @InjectRepository(MetaOption)
        private readonly metaOptionsRepository: Repository<MetaOption>,

        private readonly usersService: UserService,
    ) { }

    public async createPost(post: CreatePostDto) {

        const author = await this.usersService.findOneById(post.authorId);
        const createdPost = this.postsRepository.create({
            ...post,
            author: author
        });

        return await this.postsRepository.save(createdPost);
    }

    public async findAll() {
        const posts = await this.postsRepository.find();
        // const posts = await this.postsRepository.find({
        //     relations: ["metaOptions", "author"]
        // });
        return posts;
    }

    public async delete(id: number) {
        await this.postsRepository.delete(id);
        return { deleted: true };
    }
}
