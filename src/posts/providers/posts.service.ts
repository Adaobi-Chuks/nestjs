import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/users-service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,

        @InjectRepository(MetaOption)
        private readonly metaOptionsRepository: Repository<MetaOption>,

        private readonly usersService: UserService,
        private readonly tagsService: TagsService,
    ) { }

    public async createPost(post: CreatePostDto) {

        const author = await this.usersService.findOneById(post.authorId);
        const tags = await this.tagsService.findMultipleTags(post.tags);
        const createdPost = this.postsRepository.create({
            ...post,
            author: author,
            tags: tags
        });

        return await this.postsRepository.save(createdPost);
    }

    public async findAll() {
        const posts = await this.postsRepository.find();
        // const posts = await this.postsRepository.find({
        //     relations: ["metaOptions", "author", "tags"]
        // });
        return posts;
    }

    public async update(data: PatchPostDto) {
        const tags = await this.tagsService.findMultipleTags(data.tags);
        const post = await this.postsRepository.findOneBy({ id: data.id });

        post.title = data.title ?? post.title;
        post.content = data.content ?? post.content;
        post.status = data.status ?? post.status;
        post.postType = data.postType ?? post.postType;
        post.slug = data.slug ?? post.slug;
        post.featuredImageUrl = data.featuredImageUrl ?? post.featuredImageUrl;
        post.publishOn = data.publishOn ?? post.publishOn;
        post.tags = tags;

        return await this.postsRepository.save(post);
    }

    public async delete(id: number) {
        await this.postsRepository.delete(id);
        return { deleted: true, id };
    }
}
