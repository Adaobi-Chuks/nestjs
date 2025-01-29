import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { postType } from "./enums/postType.enum";
import { postStatus } from "./enums/postStatus.enum";
import { User } from "src/users/user.schema";
import { Tag } from "src/tags/tag.schema";

@Schema()
export class Post extends Document {
    @Prop({
        type: String,
        isRequired: true
    })
    title: string;

    @Prop({
        type: String,
        enum: postType,
        default: postType.POST,
        isRequired: true
    })
    postType: postType;

    @Prop({
        type: String,
        isRequired: true
    })
    slug: string;

    @Prop({
        type: String,
        enum: postStatus,
        default: postStatus.DRAFT,
        isRequired: true
    })
    status: postStatus;

    @Prop({
        type: String,
        isRequired: false
    })
    content?: string;

    @Prop({
        type: String,
        isRequired: false
    })
    featuredImageUrl?: string;

    @Prop({
        type: Date,
        isRequired: false
    })
    publishOn?: Date;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: User.name
    })
    author: User;

    @Prop({
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: Tag.name
        }],
        isRequired: false
    })
    tags: Tag[];
}

export const postSchema = SchemaFactory.createForClass(Post);