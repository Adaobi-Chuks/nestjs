import { Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindOneUserByEmailProvider {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    /**
     * Find a user by id
     */
    public async findOneByEmail(
        email: string
    ) {
        let user = undefined;
        try {
            user = await this.userRepository.findOneBy({ email });
        } catch (error) {
            throw new RequestTimeoutException("Unable to process your request at the moment please try later.", {
                description: "Error connecting to the database"
            })
        }
        if (!user) throw new NotFoundException("User not found");
        return user;
    }

}
