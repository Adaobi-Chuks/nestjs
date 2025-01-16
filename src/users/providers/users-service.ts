import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable, NotFoundException, RequestTimeoutException } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-params.dto";
import { AuthService } from "src/auth/providers/auth.service";
import { Repository } from "typeorm";
import { User } from "../user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../dtos/create-user.dto";
import { ConfigService, ConfigType } from "@nestjs/config";
import profileConfig from "../config/profile.config";

/**
 * Class to connect to users table and perform business operations
 */
@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,

        // private readonly configService: ConfigService

        @Inject(profileConfig.KEY)
        private readonly profileConfiguration: ConfigType<typeof profileConfig>
    ) { }

    public async createUser(user: CreateUserDto) {
        let existingUser = undefined;

        try {
            existingUser = await this.userRepository.findOne({
                where: {
                    email: user.email
                }
            });
        } catch (error) {
            throw new RequestTimeoutException("Unable to process your request at the moment please try later.", {
                description: "Error connecting to the database"
            })
        }

        if (existingUser) throw new BadRequestException("User already exists.");

        let newUser = this.userRepository.create(user);
        try {
            newUser = await this.userRepository.save(newUser);
        } catch (error) {
            throw new RequestTimeoutException("Unable to process your request at the moment please try later.", {
                description: "Error connecting to the database"
            })
        }
        return newUser;
    }

    /**
     * The method to get all users from the database
     */
    public findAll(
        getUsersParamDto: GetUsersParamDto,
        limit: number,
        page: number
    ) {

        // const envTest = this.configService.get<string>("S3_BUCKET_NAME");
        // console.log(envTest);

        // const isAuth = this.authService.isAuthenticated();
        // console.log(this.profileConfiguration);

        // return [
        //     {
        //         "firstName": "John",
        //         "lastName": "Doe",
        //         "email": "johndoe@example.com"
        //     },
        //     {
        //         "firstName": "Jane",
        //         "lastName": "Doe",
        //         "email": "janedoe@example.com"
        //     }
        // ]

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
}