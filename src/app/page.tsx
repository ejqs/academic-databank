// import SignIn from "@components/sign-in";
import { Browse, SignIn } from "@components/index";
// import { Browse, SignIn } from "@components";
import { auth } from "@/auth";
import { ProjectMetadata } from "@/util/types";

export default async function Home() {
  const session = await auth();
  if (!session?.user)
    return (
      <>
        {ProjectMetadata.homepageAcessible}
        <SignIn text="Continue" />
      </>
    );
  return <Browse />;
}
