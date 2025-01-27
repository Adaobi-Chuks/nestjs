import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiHeaders, ApiOperation } from '@nestjs/swagger';
import { UploadsService } from './providers/uploads.service';

@Controller('uploads')
export class UploadsController {

    constructor(
        private readonly uploadService: UploadsService
    ){}

    @Post("file")
    @UseInterceptors(FileInterceptor("file"))
    @ApiHeaders([
        {
            name: "Content-Type",
            description: "multipart/form-data",
        },
        {
            name: "Authorization",
            description: "Bearer Token",
        },
    ])
    @ApiOperation({
        summary: "Upload new image to the server"
    })
    public uploadFile(@UploadedFile() file: Express.Multer.File){
        return this.uploadService.uploadFile(file);
    }
}
