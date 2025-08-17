// apps/api/src/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const now = Math.floor(Date.now() / 1000);
  const samples = Array.from({ length: 25 }).map((_, i) => ({
    apiId: 1000 + i,
    timestamp: now + (i + 1) * 1800,
    lineupStatus: i % 2 ? 'pending' : 'unknown',
  }));
  for (const s of samples) {
    await prisma.fixture.upsert({
      where: { apiId: s.apiId },
      update: s,
      create: s,
    });
  }
}
// eslint-disable-next-line @typescript-eslint/no-misused-promises
void main().finally(() => prisma.$disconnect());
