// packages/shared/route.ts
// Canonical types & helpers for Next.js 15 app router pages.
// Centralizes the verbose Promise<Record<string, string | string[] | undefined>> typing
// and provides safe normalization utilities.

export type RawParamValue = string | string[] | undefined;
export type RawParamsRecord = Record<string, RawParamValue>;

/**
 * Standard page contract: both params & searchParams may be provided by Next.js
 * as Promises and values can be string | string[] | undefined.
 */
export interface RouteParams {
  params?: Promise<RawParamsRecord>;
  searchParams?: Promise<RawParamsRecord>;
}

/**
 * Normalize Next.js params/searchParams into a simple Record<string, string>.
 * - If a value is an array, take the first item.
 * - If a value is undefined, omit the key.
 */
export async function resolveParams(
  maybePromise?: Promise<RawParamsRecord>,
): Promise<Record<string, string>> {
  const raw = (await maybePromise) ?? {};
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw)) {
    if (Array.isArray(v)) out[k] = v[0];
    else if (v !== undefined) out[k] = v;
  }
  return out;
}

/**
 * Convenience wrapper specific to searchParams for readability.
 */
export async function resolveSearchParams(
  searchParams?: Promise<RawParamsRecord>,
): Promise<Record<string, string>> {
  return resolveParams(searchParams);
}

// --------- Typed coercion helpers (keep pages lean) ---------

/** Coerce a number param with a default; rejects NaN/Infinity. */
export function getNumberParam(
  params: Record<string, string>,
  key: string,
  defaultValue: number,
): number {
  const raw = params[key];
  const n = raw === undefined ? NaN : Number(raw);
  return Number.isFinite(n) ? n : defaultValue;
}

/** Coerce a boolean param ("1","true","on","yes" => true). */
export function getBooleanParam(
  params: Record<string, string>,
  key: string,
  defaultValue = false,
): boolean {
  const raw = params[key];
  if (raw === undefined) return defaultValue;
  return /^(1|true|on|yes)$/i.test(raw);
}

/**
 * Restrict to a set of allowed values; returns default if not matched.
 */
export function getEnumParam<T extends string>(
  params: Record<string, string>,
  key: string,
  allowed: readonly T[],
  defaultValue: T,
): T {
  const raw = params[key] as T | undefined;
  return raw && (allowed as readonly string[]).includes(raw)
    ? raw
    : defaultValue;
}
