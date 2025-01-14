import { IsArray, IsEnum, IsInt, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength, ValidateNested } from "class-validator";
import { postType } from "../enums/postType.enum";
import { postStatus } from "../enums/postStatus.enum";
import { CreatePostMetaOptionsDto } from "../../meta-options/dto/create-post-meta-options.dto";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePostDto {

    @ApiProperty({
        description: "Title of the post.",
        example: "My first post"
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(512)
    title: string;

    @ApiProperty({
        enum: postType,
        description: "Type of the post. Possible values are 'post', 'page', 'story', 'series'.",
        example: "post"
    })
    @IsEnum(postType)
    @IsNotEmpty()
    postType: postType;

    @ApiProperty({
        description: "Slug of the post. Must be lowercase and contain only lowercase alphanumeric characters and hyphens.",
        example: "my-first-post"
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'Slug must be lowercase and contain only lowercase alphanumeric characters and hyphens'
    })
    @MaxLength(256)
    slug: string;

    @ApiProperty({
        enum: postStatus,
        description: "Status of the post. Possible values are 'draft', 'published','review','scheduled'.",
        example: "published"
    })
    @IsEnum(postStatus)
    @IsNotEmpty()
    status: postStatus;

    @ApiPropertyOptional({
        description: "Content of the post.",
        example: "This is my first post."
    })
    @IsString()
    @IsOptional()
    content?: string;

    @ApiPropertyOptional({
        description: 'Serialize your JSON object else a validation error will be thrown',
        example: '{\n  \"context\": \"https://schema.org\",\n  \"type\": \"person\"\n}'
    })
    @IsJSON()
    @IsOptional()
    schema?: string;

    @ApiPropertyOptional({
        description: "URL of the featured image of the post.",
        example: "https://example.com/image.jpg"
    })
    @IsOptional()
    @IsUrl()
    @MaxLength(1024)
    featuredImageUrl?: string;

    @ApiPropertyOptional({
        description: "Must be a valid timestamp in ISO8601.",
        example: "2021-12-31T23:59:59Z"
    })
    @IsISO8601()
    @IsOptional()
    publishOn?: Date;

    @ApiPropertyOptional({
        description: "Array of ids of tags for the post.",
        example: [1, 2]
    })
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    tags?: number[];

    @ApiPropertyOptional({
        required: false,
        items: {
            type: 'object',
            properties: {
                metavalue: {
                    type: 'json',
                    description: 'The metaValue is a JSON string',
                    example: '{"sidebarEnabled": true,}'
                }
            }
        }
    })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreatePostMetaOptionsDto)
    metaOptions?: CreatePostMetaOptionsDto | null;

    @ApiProperty({
        type: "integer",
        required: true,
        example: 1
    })
    @IsInt()
    @IsNotEmpty()
    authorId: number;
}