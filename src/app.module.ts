import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { DbModule } from './db/db.module';
import { BookModule } from './book/book.module';
import { WinstonModule } from './winston/winston.module';
import { transports, format } from 'winston';
import configuration from '../config';
// import { authPlugins } from 'mysql2';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DbModule,
    BookModule,
    WinstonModule.forRoot({
      level: 'debug',
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.printf(({ context, level, message, time }) => {
              return `NEST ${time} ${level} ${context} ${message} `;
            }),
          ),
        }),
        new transports.File({
          format: format.combine(format.timestamp(), format.json()),
          filename: '111.log',
          dirname: 'log',
        }),
      ],
    }),
    // 配置模块
    ConfigModule.forRoot({
      cache: true,
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          ...config.get('db.mysql'),
          synchronize: true,
          logging: false,
          timezone: '+08:00',
          entities: [User],
          poolSize: 10,
          connectorPackage: 'mysql2',
          extra: { authPlugin: 'sha256_password' },
        } as any;
      },
    }),
    JwtModule.register({
      global: true,
      secret: 'Ljx!135790@.',
      signOptions: { expiresIn: '24h' },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
