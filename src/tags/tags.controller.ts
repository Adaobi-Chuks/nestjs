import { Body, Controller, Delete, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CreateTagDto } from './dtos/create-tag.dto';
import { TagsService } from './providers/tags.service';

@Controller('tags')
export class TagsController {

    constructor(
        private readonly tagsService: TagsService
    ) { }

    @Post()
    public create(@Body() tag: CreateTagDto) {
        return this.tagsService.createTag(tag);
    }

    @Delete("soft-delete")
    public softDelete(@Query("id", ParseIntPipe) id: number) {
        return this.tagsService.softRemove(id);
    }

    @Delete()
    public delete(@Query("id", ParseIntPipe) id: number) {
        return this.tagsService.delete(id);
    }
}
