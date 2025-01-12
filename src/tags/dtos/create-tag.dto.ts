import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength } from "class-validator";

export class CreateTagDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(256)
    name: string;

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

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    description: string;

    @ApiPropertyOptional()
    @IsJSON()
    @IsOptional()
    schema: string;
    
    @ApiPropertyOptional()
    @IsUrl()
    @IsOptional()
    @MaxLength(1024)
    featuredImageUrl: string;
}