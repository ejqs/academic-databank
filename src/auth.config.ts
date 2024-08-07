// Following this https://authjs.dev/getting-started/migrating-to-v5#edge-compatibility
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Google({
      profile(profile) {
        return { role: profile.role ?? "user", ...profile };
      },
    }),
  ],
} satisfies NextAuthConfig;
