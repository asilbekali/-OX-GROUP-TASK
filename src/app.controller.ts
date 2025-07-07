<<<<<<< HEAD
import { Controller, Get } from '@nestjs/common';
=======
import { Controller, Get, Post } from '@nestjs/common';
>>>>>>> 69dc15c (auth section full finished)
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
<<<<<<< HEAD
=======

  
>>>>>>> 69dc15c (auth section full finished)
}
