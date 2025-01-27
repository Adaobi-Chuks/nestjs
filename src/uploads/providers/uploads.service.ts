import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Upload } from '../upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadToAwsProvider } from './upload-to-aws-provider.ts';
import { ConfigService } from '@nestjs/config';
import { IUploadFile } from '../interfaces/upload-file.interfaces';
import { fileTypes } from '../enums/file-types.enum';
import { Express } from 'express';

@Injectable()
export class UploadsService {

    constructor(
        @InjectRepository(Upload)
        private readonly uploadRepository: Repository<Upload>,

        private readonly uploadToAwsProvider: UploadToAwsProvider,

        private readonly configService: ConfigService
    ) { }
    public async uploadFile(file: Express.Multer.File) {

        if (!["image/gif", "image/jpg", "image/jpeg", "image/png"].includes(file.mimetype)) {
            throw new BadRequestException("Invalid file type");
        }

        try {
            const name = await this.uploadToAwsProvider.uploadFile(file);

            const uploadFile: IUploadFile = {
                name,
                path: `${this.configService.get("appConfig.awsCloudFrontUrl")}/${name}`,
                type: fileTypes.IMAGE,
                mime: file.mimetype,
                size: file.size
            };

            const upload = this.uploadRepository.create(uploadFile);

            return await this.uploadRepository.save(upload);
        } catch (error) {
            throw new ConflictException(error);
        }
    }
}
