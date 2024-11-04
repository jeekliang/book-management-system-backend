import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Res,
  UseGuards,
  ValidationPipe
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginGuard } from 'src/login.guard';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @Post('register')
  create(@Body() registerUser: RegisterUserDto) {
    // console.log('register', registerUserDto);
    return this.userService.register(registerUser);
  }

  @Post('login')
  async login(@Body(ValidationPipe) loginUser: LoginUserDto, @Res({ passthrough: true }) res: Response) {
    const foundUser = await this.userService.login(loginUser);
    if (foundUser) {
      const token = await this.jwtService.signAsync({
        user: {
          username: foundUser.username,
          id: foundUser.id
        }
      });
      res.setHeader('token', token);
      return '登录成功';
    } else {
      return '登录失败';
    }
  }

  @UseGuards(LoginGuard)
  @Get('/user/:id')
  async findOne(@Param('id') id: string) {
    await this.userService.initData();
    return '校验登录状态';
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
