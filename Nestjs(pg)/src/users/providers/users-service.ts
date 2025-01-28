import { HttpException, HttpStatus, Inject, Injectable, NotFoundException, RequestTimeoutException } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-params.dto";
import { Repository } from "typeorm";
import { User } from "../user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersCreateManyProvider } from "./users-create-many.provider";
import { CreateManyUserDto } from "../dtos/create-many-users.dto";
import { FindOneUserByEmailProvider } from "./find-one-user-by-email.provider";
import { FindOneByGoogleIdProvider } from "./find-one-by-google-id.provider";
import { CreateGoogleUserProvider } from "./create-google-user.provider";
import { IGoogleUser } from "../interfaces/google-user.interface";
import { CreateUserDto } from "../dtos/create-user.dto";
import { CreateUserProvider } from "./create-user.provider";

/**
 * Class to connect to users table and perform business operations
 */
@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        private readonly userCreateMnayProvider: UsersCreateManyProvider,

        private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,

        private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider,

        private readonly createGoogleUserProvider: CreateGoogleUserProvider,

        private readonly createUserProvider: CreateUserProvider
    ) { }

    /**
     * The method to get all users from the database
     */
    public findAll(
        getUsersParamDto: GetUsersParamDto,
        limit: number,
        page: number
    ) {

        throw new HttpException(
            {
                status: HttpStatus.MOVED_PERMANENTLY,
                error: "The API endpoint does not exist",
                fileName: "users.service.ts",
                lineNumber: 86
            },
            HttpStatus.MOVED_PERMANENTLY,
            {
                cause: new Error(),
                description: "The API operation has been moved permanently"
            }
        )
    }

    /**
     * Find a user by id
     */
    public async findOneById(
        id: number
    ) {
        let user = undefined;
        try {
            user = await this.userRepository.findOneBy({ id });
        } catch (error) {
            throw new RequestTimeoutException("Unable to process your request at the moment please try later.", {
                description: "Error connecting to the database"
            })
        }
        if (!user) throw new NotFoundException("User not found");
        return user;
    }

    /**
     * Find a user by email
     */
    public async findOneByEmail(
        email: string
    ) {
        return await this.findOneUserByEmailProvider.findOneByEmail(email);
    }

    public async createUser(
        data: CreateUserDto
    ) {
        return await this.createUserProvider.createUser(data);
    }

    public async createMany(
        data: CreateManyUserDto
    ) {
        return await this.userCreateMnayProvider.createMany(data);
    }

    public async findOneByGoogleId(googleId: string){
        return await this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
    }

    public async createGoogleUser(googleUser: IGoogleUser){
        return await this.createGoogleUserProvider.createGoogleUser(googleUser);
    }
}