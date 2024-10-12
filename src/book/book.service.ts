import {
  Injectable,
  Inject,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

function randomNum() {
  return Math.floor(Math.random() * 1000000);
}

@Injectable()
export class BookService {
  @Inject()
  dbService: DbService;

  async list() {
    const books = await this.dbService.read();
    return books;
  }
  async findById(id: number) {
    const books = await this.dbService.read();
    const foundBook = books.find((book) => book.id === id);
    if (!foundBook) {
      throw new HttpException('未找到该图书', 400);
    }
    return foundBook;
  }
  async create(createBookDto: CreateBookDto) {
    const books = await this.dbService.read();
    const foundBook = books.find((book) => book.name === createBookDto.name);
    if (foundBook) {
      throw new HttpException('书名已存在', 400);
    }
    const book = new Book();
    book.id = randomNum();
    book.name = createBookDto.name;
    book.author = createBookDto.author;
    book.description = createBookDto.description;
    book.cover = createBookDto.cover;
    books.push(book);
    await this.dbService.write(books);
    return book;
  }
  async update(updateBookDto: UpdateBookDto) {
    const books = await this.dbService.read();
    const foundBook = books.find((book) => book.id === updateBookDto.id);
    if (!foundBook) {
      throw new BadRequestException('图书不存在');
    }
    foundBook.name = updateBookDto.name;
    foundBook.author = updateBookDto.author;
    foundBook.description = updateBookDto.description;
    foundBook.cover = updateBookDto.cover;
    await this.dbService.write(books);
    return foundBook;
  }
  async delete(id: number) {
    const books = await this.dbService.read();
    const index = books.findIndex((book) => book.id === id);
    if (index === -1) {
      throw new BadRequestException('图书不存在');
    }
    books.splice(index, 1);
    await this.dbService.write(books);
  }
}
