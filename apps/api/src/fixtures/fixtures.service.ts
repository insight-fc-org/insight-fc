import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class FixturesService {
  constructor(private prisma: PrismaService) {}

  listUpcoming(page: number, limit: number) {
    const now = Math.floor(Date.now() / 1000);
    return this.prisma.fixture.findMany({
      where: { timestamp: { gte: now } },
      orderBy: { timestamp: 'asc' },
      skip: (page - 1) * limit,
      take: limit,
      select: { apiId: true, timestamp: true, lineupStatus: true },
    });
  }

  countUpcoming() {
    const now = Math.floor(Date.now() / 1000);
    return this.prisma.fixture.count({ where: { timestamp: { gte: now } } });
  }
}
