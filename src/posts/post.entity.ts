import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { postType } from "./enums/postType.enum";
import { postStatus } from "./enums/postStatus.enum";
import { MetaOption } from "src/meta-options/meta-option.entity";
import { User } from "src/users/user.entity";
import { Tag } from "src/tags/tag.entity";

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 512,
        nullable: false
    })
    title: string;

    @Column({
        type: "enum",
        enum: postType,
        default: postType.POST,
        nullable: false
    })
    postType: postType;

    @Column({
        type: "varchar",
        length: 256,
        nullable: false,
        unique: true,
    })
    slug: string;

    @Column({
        type: "enum",
        enum: postStatus,
        default: postStatus.DRAFT,
        nullable: false
    })
    status: postStatus;

    @Column({
        type: "text",
        nullable: true
    })
    content?: string;

    @Column({
        type: "text",
        nullable: true
    })
    schema?: string;

    @Column({
        type: "varchar",
        length: 1024,
        nullable: true
    })
    featuredImageUrl?: string;

    @Column({
        type: "timestamp",
        nullable: true
    })
    publishOn?: Date;

    @OneToOne(() => MetaOption, (MetaOption) => MetaOption.post, {
        cascade: true,
        eager: true
    })
    metaOptions?: MetaOption;

    @ManyToMany(() => Tag, (tag) => tag.posts, {
        eager: true
    })
    @JoinTable()
    tags?: Tag[];

    @ManyToOne(() => User, (user) => user.posts, {
        eager: true
    })
    author: User
}