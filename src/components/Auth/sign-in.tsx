import { signIn } from "@/auth";
import React from "react";
export function SignIn({ className = "" }: { className?: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit" className={className}>
        Log-in
      </button>
    </form>
  );
}
