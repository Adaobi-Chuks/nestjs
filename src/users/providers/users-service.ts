import { forwardRef, Inject, Injectable } from "@nestjs/common";
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
        const existingUser = this.userRepository.findOne({
            where: {
                email: user.email
            }
        });

        if (existingUser) {

        }

        let newUser = this.userRepository.create(user);
        newUser = await this.userRepository.save(newUser);
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

        const isAuth = this.authService.isAuthenticated();
        console.log(this.profileConfiguration);

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
    public async findOneById(
        id: number
    ) {
        return await this.userRepository.findOneBy({ id })
    }
}