import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-params.dto";
import { AuthService } from "src/auth/providers/auth.service";
import { Model } from "mongoose";
import { User } from "../user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "../dtos/create-user.dto";

/**
 * Class to connect to users table and perform business operations
 */
@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,

        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService

    ) { }

    public async createUser(createUserDto: CreateUserDto) {
        const newUser = new this.userModel(createUserDto);
        return await newUser.save();
    }

    /**
     * The method to get all users from the database
     */
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

    /**
     * Find a user by id
     */
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