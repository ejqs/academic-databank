import { signIn } from "@/auth";
import React from "react";
export function SignIn({
  text = "Sign-in with Google",
  className = "",
}: {
  text?: string;
  className?: string;
}) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit" className={className}>
        {text}
      </button>
    </form>
  );
}
