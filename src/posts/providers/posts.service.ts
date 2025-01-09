import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/users-service';

@Injectable()
export class PostsService {

    constructor(
        private readonly usersService: UserService,
    ) {}

    public findAll(userId: string) {

        const user = this.usersService.findOneById(userId);
        return [
            {
                user,
                title: 'Post 1',
                content: 'This is post 1'
            },
            {
                user,
                title: 'Post 2',
                content: 'This is post 2'
            },
        ];
    }
}