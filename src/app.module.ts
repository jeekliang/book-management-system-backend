import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';
import { BookModule } from './book/book.module';
import { WinstonModule } from './winston/winston.module';
import { transports, format } from 'winston';

@Module({
  imports: [UserModule, DbModule, BookModule, WinstonModule.forRoot({
    level: 'debug',
    transports: [
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.printf(({ context, level, message, time }) => {
            return `NEST ${time} ${level} ${context} ${message} `;
          })
        ),

      }),
      new transports.File({
        format: format.combine(
          format.timestamp(),
          format.json()
        ),
        filename: '111.log',
        dirname: 'log'
      })
    ]
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
