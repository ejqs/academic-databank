// Controlled in MongoDB Database

// DONE: Reduce the number of requests to the database
// by caching the flags in memory.

// DONE: Test if caching is working properly

import { unstable_flag as flag } from "@vercel/flags/next";

const cache = new Map<string, { value: any; expiry: number }>();
const CACHE_EXPIRY_TIME = 1 * 60 * 1000; // 1 minutes

async function getFlagValue(key: string): Promise<any> {
  const cachedFlag = cache.get(key);
  const now = Date.now();

  if (cachedFlag && cachedFlag.expiry > now) {
    return cachedFlag.value;
  }

  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/getFeatureFlags`);
  const flags = await response.json();
  const value = flags[key];

  cache.set(key, { value, expiry: now + CACHE_EXPIRY_TIME });
  return value;
}

export const allowCreatePosts = flag({
  key: "allowCreatePosts",
  description: "Allows users to create posts.",
  decide: async () => {
    return await getFlagValue("allowCreatePosts");
  },
  defaultValue: true,
});

export const allowPersonalEmails = flag({
  key: "allowPersonalEmails",
  description: "Allows users to use personal emails.",
  decide: async () => {
    return await getFlagValue("allowPersonalEmails");
  },
  defaultValue: true,
});

export const precomputeFlags = [allowCreatePosts, allowPersonalEmails] as const;
