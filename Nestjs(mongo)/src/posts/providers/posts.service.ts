import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/users-service';
import { CreatePostDto } from '../dto/create-post.dto';
import { Model } from 'mongoose';
import { Post } from '../post.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostsService {

    constructor(
        @InjectModel(Post.name)
        private readonly postModel: Model<Post>,

        private readonly usersService: UserService,
    ) { }

    public async createPost(post: CreatePostDto) {
        const newPost = new this.postModel(post);
        return await newPost.save();
    }

    public async findAll() {
        return await this.postModel
            .find()
            .populate("tags author")
            .exec();
    }
}