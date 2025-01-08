import { Injectable } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-params.dto";

@Injectable()
export class UserService {

    public findAll(
        getUsersParamDto: GetUsersParamDto,
        limit: number,
        page: number
    ) {
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
        id: number
    ) {
        return {
            "id": 1234,
            "firstName": "John",
            "lastName": "Doe",
            "email": "johndoe@example.com"
        }
    }
}