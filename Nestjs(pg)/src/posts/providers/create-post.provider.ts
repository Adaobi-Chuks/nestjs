import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/users/providers/users-service';
import { TagsService } from 'src/tags/providers/tags.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { IActiveUser } from 'src/auth/interfaces/active-user.interface';

@Injectable()
export class CreatePostProvider {

    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,
        private readonly usersService: UserService,
        private readonly tagsService: TagsService,
    ) { }

    public async createPost(post: CreatePostDto, user: IActiveUser) {

        let author = undefined;
        let tags = undefined;

        try {
            author = await this.usersService.findOneById(user.sub);
            tags = await this.tagsService.findMultipleTags(post.tags);
        } catch (error) {
            throw new ConflictException(error);
        }

        if (!post.tags.length !== tags.length) {
            throw new BadRequestException("Some tags were not found");
        }

        try {
            return this.postsRepository.create({
                ...post,
                author: author,
                tags: tags
            });
        } catch (error) {
            throw new ConflictException(error, {
                description: "Ensure slug is unique"
            });
        }
    }
}
