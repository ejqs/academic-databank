// import SignIn from "@components/sign-in";
import { SignIn } from "@components/index";
import { auth } from "@/auth";
import { ProjectMetadata } from "@/util/types";
import { ensureDBConnection } from "@/lib/ensureDB";
import Paper from "@/features/papers/server/model/Paper";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session?.user)
    return (
      <div className="tw-h-full tw-flex tw-justify-center tw-flex-col tw-self-center tw-text-center tw-mb-24 tw-text-3xl">
        {ProjectMetadata.homepageAcessible}
        <SignIn className="tw-mt-3 clickable-basic" text="Continue" />
      </div>
    );
  // example https://www.google.com/search?q=test&num=10
  redirect("/paper/browse?limit=10&page=1");
}
