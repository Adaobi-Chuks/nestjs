import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/users-service';
import { SignInDto } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokensProvider } from './refresh-tokens.provider';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';

@Injectable()
export class AuthService {

    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly usersService: UserService,
    
        private readonly signInProvider: SignInProvider,
        
        private readonly refreshTokensProvider: RefreshTokensProvider
    ) {}

    public async signIn(data: SignInDto) {
        return await this.signInProvider.signIn(data);
    }

    public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
        return await this.refreshTokensProvider.refershTokens(refreshTokenDto);
    }

    public isAuthenticated(): boolean {
        return true;
    }
}
