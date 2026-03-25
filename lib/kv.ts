import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function savePlaylist(id: string, data: unknown): Promise<void> {
  await redis.set(`playlist:${id}`, JSON.stringify(data));
}

export async function getPlaylist(id: string): Promise<unknown | null> {
  const data = await redis.get(`playlist:${id}`);
  if (!data) return null;
  // Upstash auto-parses JSON, so handle both cases
  if (typeof data === "string") return JSON.parse(data);
  return data;
}