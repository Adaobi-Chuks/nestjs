import { Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { UserService } from 'src/users/providers/users-service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { GetPostsDto } from '../dtos/get-posts.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { CreatePostProvider } from './create-post.provider';
import { IActiveUser } from 'src/auth/interfaces/active-user.interface';

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,

        @InjectRepository(MetaOption)
        private readonly metaOptionsRepository: Repository<MetaOption>,

        private readonly paginationProvider: PaginationProvider,

        private readonly usersService: UserService,
        private readonly tagsService: TagsService,
        private readonly createPostProvider: CreatePostProvider
    ) { }

    public async createPost(post: CreatePostDto, user: IActiveUser) {
        return await this.createPostProvider.createPost(post, user);
    }

    public async findAll(postQuery: GetPostsDto, userId: string): Promise<Paginated<Post>> {
        // const posts = await this.postsRepository.find();
        const posts = await this.paginationProvider.paginateQuery(
            {
                limit: postQuery.limit,
                page: postQuery.page
            },
            this.postsRepository
        );
        return posts;
    }

    public async update(data: PatchPostDto) {
        let tags = undefined;
        try {
            tags = await this.tagsService.findMultipleTags(data.tags);
        } catch (error) {
            throw new RequestTimeoutException("Unable to process your request at the moment please try later.", {
                description: "Error connecting to the database"
            })
        }

        if (!tags) throw new NotFoundException("Tags not found");
        if (tags.length !== data.tags.length) throw new NotFoundException("Some tags weren't found");

        let post = undefined;
        try {
            post = await this.postsRepository.findOneBy({ id: data.id });
        } catch (error) {
            throw new RequestTimeoutException("Unable to process your request at the moment please try later.", {
                description: "Error connecting to the database"
            })
        }

        if (!post) throw new NotFoundException("Posts not found");

        post.title = data.title ?? post.title;
        post.content = data.content ?? post.content;
        post.status = data.status ?? post.status;
        post.postType = data.postType ?? post.postType;
        post.slug = data.slug ?? post.slug;
        post.featuredImageUrl = data.featuredImageUrl ?? post.featuredImageUrl;
        post.publishOn = data.publishOn ?? post.publishOn;
        post.tags = tags;

        try {
            await this.postsRepository.save(post);
        } catch (error) {
            throw new RequestTimeoutException("Unable to process your request at the moment please try later.", {
                description: "Error connecting to the database"
            })
        }

        return post;
    }

    public async delete(id: number) {
        await this.postsRepository.delete(id);
        return { deleted: true, id };
    }
}
