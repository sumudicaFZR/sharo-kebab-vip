const buckets = new Map<string, number[]>();

export function isRateLimited(key: string, limit = 8, windowMs = 60_000) {
  const now = Date.now();
  const recent = (buckets.get(key) || []).filter((time) => now - time < windowMs);
  recent.push(now);
  buckets.set(key, recent);
  return recent.length > limit;
}

export const SIX_HOURS_MS = 6 * 60 * 60 * 1000;

export function cooldownHoursRemaining(lastStampAt: string | number | null | undefined) {
  if (!lastStampAt) return 0;
  const last = typeof lastStampAt === "number" ? lastStampAt : new Date(lastStampAt).getTime();
  const remaining = SIX_HOURS_MS - (Date.now() - last);
  return Math.max(0, Math.ceil(remaining / (60 * 60 * 1000)));
}

export function expirationFromPreset(preset: string) {
  const now = Date.now();
  if (preset === "daily") return now + 24 * 60 * 60 * 1000;
  if (preset === "weekly") return now + 7 * 24 * 60 * 60 * 1000;
  if (preset === "monthly") return now + 30 * 24 * 60 * 60 * 1000;
  return null;
}
