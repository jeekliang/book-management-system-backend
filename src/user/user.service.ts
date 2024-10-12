import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from 'src/db/db.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @Inject(DbService)
  dbService: DbService;
  async create(createUserDto: CreateUserDto) {
    const users: User[] = await this.dbService.read();
    const foundUser = users.find(
      (user) => user.username === createUserDto.username,
    );
    if(foundUser) {
      throw new BadRequestException('该用户已经注册');
    }
    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    users.push(user);

    await this.dbService.write(users);
    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    console.log(loginUserDto);
    const users: User[] = await this.dbService.read();
    const foundUser = users.find(
      (user) => user.username === loginUserDto.username,
    );
    if (!foundUser) {
      throw new BadRequestException('用户不存在');
    }
    if (foundUser.password !== loginUserDto.password) {
      throw new BadRequestException('密码错误');
    }
    return foundUser;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
