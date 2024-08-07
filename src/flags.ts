// Controlled in MongoDB Database

import { unstable_flag as flag } from "@vercel/flags/next";

export const allowCreatePosts = flag({
  key: "allowCreatePosts",
  description: "Allows users to create posts.",
  decide: async () => {
    const response = await fetch(process.env.FEATURE_FLAGS_URL);
    const flags = await response.json();
    return flags["allowCreatePosts"];
  },
  defaultValue: true,
});

export const precomputeFlags = [allowCreatePosts] as const;
