import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
