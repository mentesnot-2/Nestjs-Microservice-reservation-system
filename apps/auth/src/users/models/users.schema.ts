import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { extend } from "joi";

@Schema({versionKey: false})
export class UserDocument extends AbstractDocument {
    @Prop()
    email:string
    
    @Prop()
    password:string
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
