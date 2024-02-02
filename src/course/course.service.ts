import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

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

  async findAll(): Promise<Course[]> {
    return await this.courseModel.find().exec();
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseModel.findById(id);
    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    return await this.courseModel.findById(id);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.courseModel.findById(id);
    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    return await this.courseModel.findByIdAndUpdate(id, updateCourseDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<Course> {
    const course = await this.courseModel.findById(id);
    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }
    await this.courseModel.deleteOne({
      _id: id,
    });
    return null;
  }
}
