import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-params.dto";
import { AuthService } from "src/auth/providers/auth.service";

@Injectable()
export class UserService {

    constructor(
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService
    ) { }

    public findAll(
        getUsersParamDto: GetUsersParamDto,
        limit: number,
        page: number
    ) {

        const isAuth = this.authService.isAuthenticated();
        console.log(isAuth);

        return [
            {
                "firstName": "John",
                "lastName": "Doe",
                "email": "johndoe@example.com"
            },
            {
                "firstName": "Jane",
                "lastName": "Doe",
                "email": "janedoe@example.com"
            }
        ]
    }

    public findOneById(
        id: string
    ) {
        return {
            "id": 1234,
            "firstName": "John",
            "lastName": "Doe",
            "email": "johndoe@example.com"
        }
    }
}