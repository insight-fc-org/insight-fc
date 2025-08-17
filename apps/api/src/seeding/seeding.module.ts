import { Module } from '@nestjs/common';
import { SeedingService } from './seeding.service';
import { SeedingController } from './seeding.controller';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  controllers: [SeedingController],
  providers: [SeedingService, PrismaService],
})
export class SeedingModule {}
