import { Module } from '@nestjs/common';
import { FixturesService } from './fixtures.service';
import { FixturesController } from './fixtures.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [FixturesController],
  providers: [FixturesService, PrismaService],
})
export class FixturesModule {}
