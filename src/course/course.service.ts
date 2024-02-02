import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = await this.courseModel.findOne({
      title: createCourseDto.title,
    });
    if (course) {
      throw new HttpException(
        'Course with this title already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdCourse = new this.courseModel(createCourseDto);
    return createdCourse.save();
  }
}
