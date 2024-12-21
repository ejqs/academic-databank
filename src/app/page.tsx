// import SignIn from "@components/sign-in";
import { Browse, SignIn } from "@components/index";
// import { Browse, SignIn } from "@components";
import { auth } from "@/auth";
import { ProjectMetadata } from "@/util/types";
import { ensureDBConnection } from "@/lib/ensureDB";
import Paper from "@/features/papers/server/model/Paper";

export default async function Home() {
  const session = await auth();

  if (!session?.user)
    return (
      <div className="tw-h-full tw-flex tw-justify-center tw-flex-col tw-self-center tw-text-center tw-mb-24 tw-text-3xl">
        {ProjectMetadata.homepageAcessible}
        <SignIn className="tw-mt-3 clickable-basic" text="Continue" />
      </div>
    );

  await ensureDBConnection();
  const papers = await Paper.find({});
  return <Browse />;
}
