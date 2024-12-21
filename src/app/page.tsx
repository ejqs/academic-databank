import SignIn from "@components/sign-in";
import Browse from "@components/Browse/Browse";
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
