import { BadGatewayException, BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModel } from './schema/user.schema';
import { v4 as uuid } from "uuid";
import * as bcrypt from 'bcrypt'
import { ErrorMessages } from 'src/common/constant/errors.constant';
import { PartialModelObject } from 'objection';


@Injectable()
export class UserService {
  async createUser(createUserDto: CreateUserDto) {
    // try {
      const userId = uuid();
      const { fullName, email, password } = createUserDto;
      const userExist = (await UserModel.query().findOne({ email }));

      if (userExist) {
        throw new BadRequestException(ErrorMessages.USER_EXIST);
      }

      const hashPassword = await bcrypt.hash(password, 10)
      const data = { userId, fullName, email, password: hashPassword } as PartialModelObject<UserModel>

      const user = (await UserModel.query().insert(data)).toJSON();

      return { success: true, message: 'new user created successfully', data: user };
    
  }


  async getUserByEmail(email: string) {
    const userExist = (await UserModel.query().findOne({ email }));

    if (!userExist) {
      throw new BadRequestException(ErrorMessages.userEmailNotFound(email))
    };

    return { success: true, message: 'user fetched successfully', data: userExist };
  }

  async getUserById(userId: string) {
    try {

      const userExist = (await UserModel.query().findOne({ userId }));

      if (!userExist) {
        throw new BadRequestException(ErrorMessages.userNotFound(userId))
      };

      return { success: true, message: 'user fetched successfully', data: userExist };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

}
