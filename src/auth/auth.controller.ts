import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/signin.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post("sign-in")
    @HttpCode(HttpStatus.OK)
    public async sigIn(@Body() data: SignInDto) {
        return this.authService.signIn(data);
    }
}
