import strings from "@/strings";
import SignIn from "@components/sign-in";
import Browse from "@components/Browse/Browse";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  if (!session?.user)
    return (
      <>
        {strings.homepageAcessible}
        <SignIn text="Continue" />
      </>
    );
  return <Browse />;
}
