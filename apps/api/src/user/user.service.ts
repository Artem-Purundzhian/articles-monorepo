import { Injectable } from '@nestjs/common';
import { EditUserDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async editUser(userId: number, dto: EditUserDto) {
    const user = await this.userModel
      .findByIdAndUpdate(
        userId,
        {
          $set: dto,
        },
        { new: true },
      )
      .select('-hash');

    return user;
  }
}
