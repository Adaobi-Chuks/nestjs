import { Body, Controller, Get, Headers, Ip, Param, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('users')
export class UsersController {

    @Get("/:id/:optional?")
    public getUsers(@Param("id") id: any, @Query() query: any) {
        console.log(id);
        console.log(query);
        return 'You sent a get request to users endpoint';
    }

    @Post()
    public createUsers(@Body() request: any, @Headers() headers: any, @Ip() ip: any) {
        console.log(request);
        console.log(headers);
        console.log(ip);
        return 'You sent a post request to users endpoint';
    }

    // @Post()
    // public createUsers(@Req() request: Request) {
    //     console.log(request);
    //     return 'You sent a post request to users endpoint';
    // }
}
