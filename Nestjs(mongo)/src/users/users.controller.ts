import { Body, Controller, DefaultValuePipe, Get, Headers, Ip, Param, ParseIntPipe, Patch, Post, Query, Req, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dtos/create-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UserService } from './providers/users-service';
import { GetUsersParamDto } from './dtos/get-users-params.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags("Users")
export class UsersController {

    constructor(
        private readonly usersService: UserService
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
    public createUsers(
        @Body() user: CreateUserDto,
        // @Headers() headers: any,
        // @Ip() ip: any
    ) {
        // console.log(headers);
        // console.log(ip);
        return this.usersService.createUser(user);
    }

    // @Post()
    // public createUsers(@Req() request: Request) {
    //     console.log(request);
    //     return 'You sent a post request to users endpoint';
    // }

    @Patch()
    public patchUser(
        @Body() data: PatchUserDto
    ) {
        return data;
    }
}
