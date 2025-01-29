import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PatchPostDto } from './dto/patch-post.dto';

@Controller('posts')
@ApiTags("Posts")
export class PostsController {

    constructor(
        private readonly postsService: PostsService,
    ) { }

    @Get()
    public getPosts() {
        return this.postsService.findAll();
    }

    @ApiOperation({
        summary: 'Create a new blog post.'
    })
    @ApiResponse({
        status: 201,
        description: 'The post has been successfully created.',
    })
    @Post()
    public createPost(@Body() post: CreatePostDto) {
        return this.postsService.createPost(post);
    }

    @ApiOperation({
        summary: 'Update a blog post.'
    })
    @ApiResponse({
        status: 200,
        description: 'The post has been successfully updated.',
    })
    @Patch()
    public updatePost(@Body() data: PatchPostDto) {
        console.log(data)
    }
}
