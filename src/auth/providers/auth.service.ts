import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/users-service';
import { SignInDto } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';

@Injectable()
export class AuthService {

    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly usersService: UserService,
    
        private readonly signInProvider: SignInProvider
    ) {}

    public async signIn(data: SignInDto) {

        return await this.signInProvider.signIn(data);
    }

    public isAuthenticated(): boolean {
        return true;
    }
}
