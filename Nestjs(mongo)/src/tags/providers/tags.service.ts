import { Injectable } from '@nestjs/common';
import { Tag } from '../tag.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTagDto } from '../dtos/create-tag.dto';

@Injectable()
export class TagsService {
    constructor(
        @InjectModel(Tag.name)
        private readonly tagModel: Model<Tag>
    ){}

    public async createTag(tag: CreateTagDto) {
        const newTag = new this.tagModel(tag);
        return await newTag.save();
    }
}
