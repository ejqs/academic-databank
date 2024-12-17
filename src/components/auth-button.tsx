import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import SignOut from "@/components/sign-out";

async function AuthButton() {
  const session = await auth();
  // console.log("🔃", session);
  if (!session?.user) return <SignIn />;
  return <SignOut />;
}

export default AuthButton;
