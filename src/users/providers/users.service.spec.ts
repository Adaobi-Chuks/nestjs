import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './users-service';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { CreateUserProvider } from './create-user.provider';
import { CreateUserDto } from '../dtos/create-user.dto';

describe('UsersService', () => {
    let service: UserService;

    beforeEach(async () => {
        const mockCreateUserProvider: Partial<CreateUserProvider> = {
            createUser: (createUserDto: CreateUserDto) => Promise.resolve({
                id: 1,
                firstName: createUserDto.firstName,
                lastName: createUserDto.lastName,
                email: createUserDto.email,
                password: createUserDto.password
            })
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                { provide: DataSource, useValue: {} },
                { provide: getRepositoryToken(User), useValue: {} },
                { provide: CreateUserProvider, useValue: mockCreateUserProvider },
                { provide: UsersCreateManyProvider, useValue: {} },
                { provide: FindOneUserByEmailProvider, useValue: {} },
                { provide: FindOneByGoogleIdProvider, useValue: {} },
                { provide: CreateGoogleUserProvider, useValue: {} }
            ]
        }).compile();

        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe("createUser", () => {
        it("should be defined", () => {
            expect(service.createUser).toBeDefined();
        })
        it("should call createUser on CreateUserProvider", async () => {
            let user = await service.createUser({
                firstName: "John",
                lastName: "Doe",
                email: "john@example.com",
                password: "password123"
            });
            expect(user.firstName).toEqual("John");
        })
    })
});