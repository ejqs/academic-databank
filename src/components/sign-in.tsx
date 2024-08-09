import { signIn } from "@/auth";
import React from "react";
export default function SignIn({
  text = "Signin with Google",
}: {
  text?: string;
}) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit">{text}</button>
    </form>
  );
}
