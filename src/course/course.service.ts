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
    @InjectModel('User') private userModel: Model<any>,
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
    return await this.courseModel
      .find()
      .populate('instructor', '', this.userModel)
      .populate('students', '', this.userModel);
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

  async enroll(courseId: string, userId: string): Promise<Course> {
    const course = await this.courseModel.findById(courseId);
    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    const isUserExist = await this.userModel.findOne({
      _id: userId,
    });

    if (!isUserExist) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (course.instructor.toString() == userId) {
      throw new HttpException(
        'Instructor cannot enroll in his own course',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.courseModel.findOne({
      _id: courseId,
      students: userId,
    });
    if (user) {
      throw new HttpException(
        'User is already enrolled in this course',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.courseModel.findByIdAndUpdate(
      courseId,
      {
        $push: { students: userId },
      },
      { new: true },
    );
  }
}
