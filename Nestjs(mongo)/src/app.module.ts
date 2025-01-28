import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://nestjs:4kRbli2h2k5F50tb@nestjs.dgq4bvd.mongodb.net/?retryWrites=true&w=majority&appName=nestjs',
      { dbName: 'nestjs-blog' },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
