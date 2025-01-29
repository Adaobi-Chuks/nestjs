import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
    @Prop({
        type: String,
        isRequired: true
    })
    firstName: string;

    @Prop({
        type: String,
        isRequired: false
    })
    lastName: string;

    @Prop({
        type: String,
        isRequired: true,
        unique: true
    })
    email: string;

    @Prop({
        type: String,
        isRequired: true
    })
    password: string;
}

export const userSchema = SchemaFactory.createForClass(User);