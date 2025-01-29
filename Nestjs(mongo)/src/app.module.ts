import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    MongooseModule.forRoot(
      "mongodb+srv://ada:vaultpassword@vault.ekd9b2u.mongodb.net",
      { dbName: "NestJsBlogAPI" }
    ),
    TagsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }