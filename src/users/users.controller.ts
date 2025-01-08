import { Body, Controller, DefaultValuePipe, Get, Headers, Ip, Param, ParseIntPipe, Patch, Post, Query, Req, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dtos/create-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UserService } from './providers/users-service';
import { GetUsersParamDto } from './dtos/get-users-params.dto';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UserService
    ){}

    @Get("/:id?")
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
        console.log(user);
        // console.log(headers);
        // console.log(ip);
        return 'You sent a post request to users endpoint';
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
