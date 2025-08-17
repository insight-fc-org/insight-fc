import { Controller, Get, Query } from '@nestjs/common';
import { FixturesService } from './fixtures.service';
import { z } from 'zod';

const QuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: z.enum(['upcoming']).default('upcoming'),
});

@Controller('fixtures')
export class FixturesController {
  constructor(private readonly svc: FixturesService) {}

  @Get()
  async list(@Query() raw: any) {
    const { page, limit } = QuerySchema.parse(raw);
    const [data, total] = await Promise.all([
      this.svc.listUpcoming(page, limit),
      this.svc.countUpcoming(),
    ]);
    return { page, limit, total, data };
  }
}
