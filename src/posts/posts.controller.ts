import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostsDto } from './dtos/get-posts.dto';

@Controller('posts')
@ApiTags("Posts")
export class PostsController {

    constructor(
        private readonly postsService: PostsService,
    ) { }

    @Get("/:userId?")
    public getPosts(
        @Param("userId") userId: string,
        @Query() postQuery: GetPostsDto
    ) {
        return this.postsService.findAll(postQuery, userId);
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
        return this.postsService.update(data);
    }

    @ApiOperation({
        summary: 'Delete a blog post.'
    })
    @ApiResponse({
        status: 200,
        description: 'The post has been successfully deleted.',
    })
    @Delete()
    public deletePost(@Query("id", ParseIntPipe) id: number) {
        return this.postsService.delete(id);
    }
}
