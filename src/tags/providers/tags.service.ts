import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag.entity';

@Injectable()
export class TagsService {

    constructor(
        @InjectRepository(Tag)
        private readonly tagsRepository: Repository<Tag>
    ) { }

    public async createTag(tag: CreateTagDto) {
        const createdTag = this.tagsRepository.create(tag);
        return await this.tagsRepository.save(createdTag);
    }

    public async findMultipleTags(tags: number[]) {
        const results = await this.tagsRepository.find({
            where: {
                id: In(tags)
            }
        });
        return results;
    }

    public async softRemove(id: number) {
        await this.tagsRepository.softDelete(id);
        return { deleted: true, id };
    }

    public async delete(id: number) {
        await this.tagsRepository.delete(id);
        return { deleted: true, id };
    }
}
