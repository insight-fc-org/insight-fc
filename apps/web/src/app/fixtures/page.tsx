// apps/web/app/fixtures/page.tsx
import { getNumberParam, resolveSearchParams, RouteParams } from "shared/route";

export const dynamic = "force-dynamic";

type Fixture = { apiId: number; timestamp: number; lineupStatus: string };

async function getData(page = 1, limit = 20) {
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(
    `${base}/fixtures?status=upcoming&page=${page}&limit=${limit}`,
    { cache: "no-store" },
  );
  if (!res.ok) throw new Error("Failed to fetch fixtures");
  return (await res.json()) as Promise<{
    page: number;
    limit: number;
    total: number;
    data: Fixture[];
  }>;
}

export default async function FixturesPage({ searchParams }: RouteParams) {
  const sp = await resolveSearchParams(searchParams);
  const page = getNumberParam(sp, "page", 1);
  const limit = getNumberParam(sp, "limit", 20);

  const { data, total } = await getData(page, limit);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Upcoming Fixtures</h1>
      {data.length === 0 ? (
        <div className="rounded-xl border p-6">No fixtures available.</div>
      ) : (
        <table className="w-full border rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-3">API ID</th>
              <th className="text-left p-3">Timestamp (UTC)</th>
              <th className="text-left p-3">Lineup Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((f) => (
              <tr key={f.apiId} className="border-t">
                <td className="p-3">{f.apiId}</td>
                <td className="p-3">
                  {new Date(f.timestamp * 1000)
                    .toISOString()
                    .replace("T", " ")
                    .slice(0, 16)}
                </td>
                <td className="p-3">{f.lineupStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p className="mt-3 text-sm text-gray-500">Total upcoming: {total}</p>
    </main>
  );
}
