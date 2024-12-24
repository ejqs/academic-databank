// Following this https://authjs.dev/getting-started/migrating-to-v5#edge-compatibility
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { allowPersonalEmails } from "@/flags";
import User from "./features/users/server/models/User";

export default {
  //   DO NOT ADD MORE PROVIDERS. See allowDangerousEmailAccountLinking below

  //   PERMISSION LEVELS GUIDE
  //   - "-1" Deny login (for banned users)
  //   - 0 Read access only (restricted/personal accounts)
  //   - Assigned at signup
  //       - permission level 1 to all users
  //       - even if permission_level is 1, if personal_email cannot be found in database, login will be rejected
  //   - 2 for moderator account
  //       - can hide posts
  //   - 3 for admin accounts (research chairpersons)
  //       - can freeze accounts
  //           - force read only
  //       - can hide posts
  //       - can assign permissions
  //           - by default only 2 admin accounts can be assigned
  //       - can backup database (???)

  providers: [
    Google({
      allowDangerousEmailAccountLinking: true, // Read https://authjs.dev/reference/core/providers#allowdangerousemailaccountlinking
      profile(profile) {
        return {
          permission_level:
            profile.permission_level ??
            (profile.email.endsWith("@su.edu.ph") ? 1 : 0), // Defaults to 0 if personal account is used
          frozen: profile.frozen ?? false,
          personal_email: profile.personal_email ?? "",
          last_submission_time: profile.last_submission_time ?? 0,
          rate_limit: profile.rate_limit ?? 5,
          isFrozen: profile.isFrozen ?? false,
          ...profile,
        };
      },
    }),
  ],
  callbacks: {
    //   Very very scuffed solution
    // TODO: Need way to migrate data to personal account and visa versa.
    // TODO: Check if I change datafields for profile here if it will be affected in above.
    // FOUND Solution: Separate User Collection from Data

    async signIn({ profile }) {
      // Banned users; No Read/Write Access
      if (profile.permission_level === -1) {
        return false;
      }

      if (profile.email.endsWith("@su.edu.ph")) {
        return true;
      }

      // Check if the email exists in the database
      // FIXME: Mongoose works on dev, not on build/prod

      const personalEmailsFeature = await allowPersonalEmails();
      if (personalEmailsFeature) {
        try {
          const founduser = await User.findOne({
            personal_email: profile.email,
          });
          if (founduser) {
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.error("Error:", error);
          return false;
        }
      }

      return false;
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
} satisfies NextAuthConfig;
