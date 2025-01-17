import { forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/providers/users-service';
import { SignInDto } from '../dtos/signin.dto';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class SignInProvider {

    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly usersService: UserService,

        private readonly hashingProvider: HashingProvider,

        private readonly jwtService: JwtService,

        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
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

        const accessToken = await this.jwtService.signAsync(
            {
                sub: user.id,
                email: user.email
            },
            {
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                secret: this.jwtConfiguration.secret,
                expiresIn: this.jwtConfiguration.accessTokenTtl
            });

        return { accessToken };
    }
}
