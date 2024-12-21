import SignIn from "@components/sign-in";
import Browse from "@components/Browse/Browse";
import { auth } from "@/auth";
import { ProjectMetadata } from "@/util/types";
import { ensureDBConnection } from "@/lib/ensureDB";
import Paper from "@/features/papers/server/model/Paper";

export default async function Home() {
  const session = await auth();

  if (!session?.user)
    return (
      <>
        {ProjectMetadata.homepageAcessible}
        <SignIn text="Continue" />
      </>
    );

  await ensureDBConnection();
  const papers = await Paper.find({});
  return <Browse />;
}
