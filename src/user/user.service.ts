import { Injectable, HttpException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm'
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { DbService } from 'src/db/db.service';
import { User } from './entities/user.entity';
import * as crypto from 'crypto';

function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

@Injectable()
export class UserService {
  private logger: Logger;

  @InjectRepository(User)
  private userRepository: Repository<User>;
  
  async register(user: RegisterUserDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: user.username
    });
    if(foundUser) {
      throw new HttpException('该用户已经注册', 200);
    }
    const newUser = new User();
    newUser.username = user.username;
    newUser.password = md5(user.password);

    try {
      await this.userRepository.save(newUser);
      return '注册成功';
    } catch (error) {
      this.logger.error(error, UserService);
      return '注册失败';
    }
  }

  async login(loginUser: LoginUserDto) {
    // console.log(loginUser);
    const foundUser = await this.userRepository.findOneBy({
      username: loginUser.username
    });

    if(!foundUser) {
      throw new HttpException('用户名不存在', 200);
    }

    if (foundUser.password !== md5(loginUser.password)) {
      throw new HttpException('密码错误', 200);
    }
    return foundUser;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
