import { Controller, Get, Logger, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { WINSTON_LOGGER_TOKEN } from './winston/winston.module';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Inject(WINSTON_LOGGER_TOKEN)
  private logger
  
  @Get()
  getHello(): string {
    this.logger.log('Hello World!', AppController.name);
    return this.appService.getHello();
  }
}
