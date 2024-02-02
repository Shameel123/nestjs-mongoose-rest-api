import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.userModel.exists({ email: createUserDto.email })) {
      throw new HttpException('User already exists', 400);
    }

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    const userExists = await this.userModel.exists({ _id: id });
    if (!userExists) {
      throw new HttpException('User not found', 404);
    }
    return this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userExists = await this.userModel.exists({ _id: id });
    if (!userExists) {
      throw new HttpException('User not found', 404);
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );
    return updatedUser;
  }

  async remove(id: string) {
    const userExists = await this.userModel.exists({ _id: id });
    if (!userExists) {
      throw new HttpException('User not found', 404);
    }
    return this.userModel.deleteOne({ _id: id });
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({
      email,
    });
  }
}
