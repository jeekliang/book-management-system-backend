import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  Res,
  UseGuards,
  ValidationPipe,
  SetMetadata,
  Req
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginGuard } from 'src/login.guard';
import { PermissionGuard } from './permission.guard';
import { Request } from 'express';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Inject(JwtService)
  private jwtService: JwtService;

  @Post('register')
  create(@Body() registerUser: RegisterUserDto) {
    // console.log('register', registerUserDto);
    return this.userService.register(registerUser);
  }

  @Get()
  initData() {
    this.userService.initData();
  }

  @Post('login')
  async login(
    @Body(ValidationPipe) loginUser: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const foundUser = await this.userService.login(loginUser);
    if (foundUser) {
      const token = await this.jwtService.signAsync({
        user: {
          username: foundUser.username,
          id: foundUser.id,
        },
      });
      return {
        ...foundUser,
        token
      };
    } else {
      return '登录失败';
    }
  }

  @Get('userInfo')
  async getUserInfo(@Req() req: Request) {
    const authorization = req.headers.authorization;
    const foundUser = await this.userService.getUserInfo(authorization);
    return foundUser;
  }

  @Get('/user/:id')
  @UseGuards(LoginGuard, PermissionGuard)
  @SetMetadata('permission', 'query_aaa')
  async findOne(@Param('id') id: string) {
    console.log('id', id);
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
