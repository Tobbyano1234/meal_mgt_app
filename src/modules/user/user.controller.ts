import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserByEmailDto } from './dto/get-user.tdo';
import { JwtAuthGuard } from '../auth/guards/jwt-guard.guard';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post("/signup")
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/")
  async getUserByEmail(@Body() getUserByEmailDto: GetUserByEmailDto) {
    const { email } = getUserByEmailDto;
    return await this.userService.getUserByEmail(email)

  }

  @Get(":id")
  async getUerById(@Param("id") id: string) {
    return await this.userService.getUserById(id);
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
