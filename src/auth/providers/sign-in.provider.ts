import { forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/providers/users-service';
import { SignInDto } from '../dtos/signin.dto';
import { HashingProvider } from './hashing.provider';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class SignInProvider {

    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly usersService: UserService,

        private readonly hashingProvider: HashingProvider,

        private readonly generateTokensProvider: GenerateTokensProvider,
    ) { }

    public async signIn(data: SignInDto) {
        const user = await this.usersService.findOneByEmail(data.email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        let isEqual: boolean = false;

        try {
            isEqual = await this.hashingProvider.comparePassword(
                data.password,
                user.password
            )
        } catch (error) {
            throw new RequestTimeoutException(error, {
                description: "Could not compare passwords"
            })
        }

        if (!isEqual) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const tokens = await this.generateTokensProvider.generateTokens(user)

        return tokens;
    }
}
