import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { IGoogleUser } from '../interfaces/google-user.interface';

@Injectable()
export class CreateGoogleUserProvider {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    public async createGoogleUser(googleUser: IGoogleUser) {
        try{
            const user = this.userRepository.create(googleUser);
            return await this.userRepository.save(user);
        } catch(error) {
            throw new ConflictException(error, {
                description: 'Could not create new user'
            });
        }
    }
}
