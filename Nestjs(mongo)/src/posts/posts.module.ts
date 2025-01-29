import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts.service';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, postSchema } from './post.schema';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [UsersModule,
    MongooseModule.forFeature([{
      name: Post.name,
      schema: postSchema
    }])
  ]
})
export class PostsModule { }
