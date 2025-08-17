import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class SeedingService {
  constructor(private readonly prisma: PrismaService) {}

  async seedDatabase() {
    const now = Math.floor(Date.now() / 1000);
    const items = Array.from({ length: 25 }, (_, i) => ({
      apiId: 2000 + i,
      timestamp: now + (i + 1) * 900,
      lineupStatus: i % 2 ? 'pending' : 'unknown',
    }));

    // Group all upsert operations into a single transaction for performance and atomicity
    const upsertOperations = items.map((item) =>
      this.prisma.fixture.upsert({
        where: { apiId: item.apiId },
        update: item,
        create: item,
      }),
    );

    await this.prisma.$transaction(upsertOperations);

    return { success: true, message: `${items.length} records seeded.` };
  }
}
