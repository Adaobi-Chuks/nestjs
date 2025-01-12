import { Injectable } from '@nestjs/common';
import { CreatePostMetaOptionsDto } from '../dto/create-post-meta-options.dto';
import { Repository } from 'typeorm';
import { MetaOption } from '../meta-option.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MetaOptionsService {

    constructor(
        @InjectRepository(MetaOption)
        private readonly metaOptionsRepository: Repository<MetaOption>
    ) {}

    public async create(postMetaOptions: CreatePostMetaOptionsDto) {
        let metaOption = this.metaOptionsRepository.create(postMetaOptions);
        return await this.metaOptionsRepository.save(metaOption);
    }
}
