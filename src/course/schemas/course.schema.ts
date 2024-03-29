import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

@Schema()
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  instructor: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: User.name, default: [] },
    ],
  })
  students: mongoose.Schema.Types.ObjectId[];
}

export type CourseDocument = Course & Document;

export const CourseSchema = SchemaFactory.createForClass(Course);
