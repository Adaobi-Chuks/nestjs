import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/signin.dto';
import { Auth } from './decorator/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,

        private readonly refreshTokenProvider: RefreshTokensProvider
    ) { }

    @Post("sign-in")
    @Auth(AuthType.None)
    @HttpCode(HttpStatus.OK)
    public async sigIn(@Body() data: SignInDto) {
        return this.authService.signIn(data);
    }

    @Post("refresh-tokens")
    @Auth(AuthType.None)
    @HttpCode(HttpStatus.OK)
    public async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.refreshTokenProvider.refershTokens(refreshTokenDto);
    }
}
