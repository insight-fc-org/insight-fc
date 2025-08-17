import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { FixturesModule } from './fixtures/fixtures.module';
import { SeedingModule } from './seeding/seeding.module';

const developmentModules =
  process.env.NODE_ENV !== 'production' ? [SeedingModule] : [];

@Module({
  imports: [FixturesModule, ...developmentModules],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
