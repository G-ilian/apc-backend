import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  healthCheck(): string {
    return 'Ok - Aprucare Backend is running';
  }
}
