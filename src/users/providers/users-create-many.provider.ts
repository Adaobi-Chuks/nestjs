import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '../user.entity';
import { CreateManyUserDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UsersCreateManyProvider {

    constructor(
        private readonly dataSource: DataSource
    ) { }

    /**
    * Create multiple users
    */
    public async createMany(
        data: CreateManyUserDto
    ) {
        let newUsers: User[] = [];
        const queryRunner = this.dataSource.createQueryRunner();
        
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
        } catch (err) {
            throw new RequestTimeoutException("Could not connect to the database.")
        }

        try {
            for (let user of data.users) {
                let newUser = queryRunner.manager.create(User, user);
                let result = await queryRunner.manager.save(newUser);
                newUsers.push(result);

                await queryRunner.commitTransaction();
            }
        } catch (errror) {
            await queryRunner.rollbackTransaction();
            throw new ConflictException("Could not complete the transaction.", {
                description: String(errror)
            })
        } finally {
            try {
                await queryRunner.release();
            } catch (error) {
                throw new RequestTimeoutException("Could not release the connection.", {
                    description: String(error)
                })
            }
        }
        return newUsers;
    }
}
