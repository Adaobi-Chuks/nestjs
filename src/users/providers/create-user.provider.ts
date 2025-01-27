import { BadRequestException, forwardRef, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { MailService } from 'src/mail/providers/mail.service';

@Injectable()
export class CreateUserProvider {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @Inject(forwardRef(() => HashingProvider))
        private readonly hashingProvider: HashingProvider,

        private readonly mailService: MailService
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

        let newUser = this.userRepository.create({
            ...user,
            password: await this.hashingProvider.hashPassword(user.password)
        });
        try {
            newUser = await this.userRepository.save(newUser);
        } catch (error) {
            throw new RequestTimeoutException("Unable to process your request at the moment please try later.", {
                description: "Error connecting to the database"
            })
        }

        console.log(newUser)
        try {
            await this.mailService.sendUserWelcome(newUser);
        } catch (error) {
            throw new RequestTimeoutException(error.message);
        }

        return newUser;
    }
}
