import { auth } from "@/auth";
import { SignOut, SignIn } from "@/components/index";

export async function AuthButton({ className = "" }: { className?: String }) {
  const session = await auth();
  // console.log("🔃", session);
  if (!session?.user) return <SignIn className={`header-item ${className}`} />;
  return <SignOut className={`header-item ${className}`} />;
}
