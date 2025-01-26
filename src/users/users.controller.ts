import { Body, ClassSerializerInterceptor, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UserService } from './providers/users-service';
import { GetUsersParamDto } from './dtos/get-users-params.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateManyUserDto } from './dtos/create-many-users.dto';
import { CreateUserProvider } from './providers/create-user.provider';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

@Controller('users')
@ApiTags("Users")
export class UsersController {

    constructor(
        private readonly usersService: UserService,
        private readonly createUserProvider: CreateUserProvider
    ){}

    @Get("/:id?")
    @ApiOperation({
        summary: "Fetches a list of registered users on the application",
        description: "This endpoint returns a list of users based off the inputted query and params."
    })
    @ApiQuery({
        name: "limit",
        required: false,
        type: Number,
        description: "The number of users returned per query.",
        example: 10
    })
    @ApiQuery({
        name: "page",
        required: false,
        type: Number,
        description: "The page number you want the api to return.",
        example: 1
    })
    @ApiResponse({
        status: 200,
        description: "The list of users was successfully returned."
    })
    public getUsers(
        @Param() params: GetUsersParamDto,
        @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number | undefined,
        @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number | undefined
    ) {
        return this.usersService.findAll(params, limit, page)
    }

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    @Auth(AuthType.None)
    public createUsers(
        @Body() user: CreateUserDto,
    ) {
        return this.createUserProvider.createUser(user);
    }

    @Post("create-many")
    public createManyUsers(
        @Body() users: CreateManyUserDto
    ) {
        return this.usersService.createMany(users);
    }

    @Patch()
    public patchUser(
        @Body() data: PatchUserDto
    ) {
        return data;
    }
}
