import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { DbModule } from './db/db.module';
import { BookModule } from './book/book.module';
import { WinstonModule } from './winston/winston.module';
import { transports, format } from 'winston';
import { authPlugins } from 'mysql2';

@Module({
  imports: [DbModule, BookModule, WinstonModule.forRoot({
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
  }), TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Ljx!135790@.',
    database: 'login_test',
    synchronize: true,
    logging: true,
    timezone: '+08:00',
    entities: [User],
    poolSize: 10,
    connectorPackage: 'mysql2',
    extra: { authPlugin: 'sha256_password' },
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
