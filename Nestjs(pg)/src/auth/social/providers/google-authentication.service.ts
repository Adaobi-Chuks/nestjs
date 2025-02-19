import { forwardRef, Inject, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UserService } from 'src/users/providers/users-service';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {

    private oauthClient: OAuth2Client;

    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly usersService: UserService,

        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

        private readonly generateTokensProvider: GenerateTokensProvider

    ) { }

    onModuleInit() {
        const clientId = this.jwtConfiguration.googleClientId;
        const clientSecret = this.jwtConfiguration.googleClientSecret;

        this.oauthClient = new OAuth2Client({
            clientId,
            clientSecret
        });
    }

    public async authenticate(googleTokenDto: GoogleTokenDto) {
        try {
            const loginTicket = await this.oauthClient.verifyIdToken({
                idToken: googleTokenDto.token
            });

            const {
                email,
                sub: googleId,
                given_name: firstName,
                family_name: lastName
            } = loginTicket.getPayload();

            const user = await this.usersService.findOneByGoogleId(googleId);

            if (user) {
                return this.generateTokensProvider.generateTokens(user);
            }

            const newUser = await this.usersService.createGoogleUser({
                email,
                googleId,
                firstName,
                lastName
            });

            return this.generateTokensProvider.generateTokens(newUser);
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }
}
