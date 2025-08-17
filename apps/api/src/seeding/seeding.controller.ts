import { Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { SeedingService } from './seeding.service';

@Controller('_test')
export class SeedingController {
  constructor(private readonly seedingService: SeedingService) {}

  @Post('seed')
  @HttpCode(HttpStatus.CREATED)
  async seed() {
    return this.seedingService.seedDatabase();
  }
}
