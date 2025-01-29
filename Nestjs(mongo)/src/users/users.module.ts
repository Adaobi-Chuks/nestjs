import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './providers/users-service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './user.schema';

@Module({
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{
      name: User.name,
      schema: userSchema
    }])
  ]
})
export class UsersModule { }