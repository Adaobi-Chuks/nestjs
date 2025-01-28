import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/users-service';

@Injectable()
export class AuthService {

    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly usersService: UserService
    ) {}

    public login(email: string, password: string, id: string) {
        const user = this.usersService.findOneById(id); 
        return "Sample Token"
    }

    public isAuthenticated(): boolean {
        return true;
    }
}
