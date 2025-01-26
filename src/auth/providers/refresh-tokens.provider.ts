import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { UserService } from 'src/users/providers/users-service';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { IActiveUser } from '../interfaces/active-user.interface';

@Injectable()
export class RefreshTokensProvider {

    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly usersService: UserService,

        private readonly jwtService: JwtService,

        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

        private readonly generateTokensProvider: GenerateTokensProvider
    ) { }

    public async refershTokens(refershTokenDto: RefreshTokenDto) {
        try {
            const { sub } = await this.jwtService.verifyAsync<Pick<IActiveUser, "sub">>(refershTokenDto.refreshToken, {
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                secret: this.jwtConfiguration.secret
            });

            const user = await this.usersService.findOneById(sub);

            return await this.generateTokensProvider.generateTokens(user);
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}