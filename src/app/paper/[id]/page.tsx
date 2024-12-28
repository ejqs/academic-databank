import { auth } from "@/auth";
import Paper from "@/features/papers/server/model/Paper";

import { ensureDBConnection } from "@/lib/ensureDB";
import Link from "next/link";

export default async function ViewPaperPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await ensureDBConnection();
  const id = (await params).id;
  const paper = await Paper.findOne({ _id: id });
  const session = await auth();
  if (!session?.user) return null;
  return (
    <div>
      {session.user.email === paper.metadata.owner ? (
        <>
          <div>
            <Link href={`${id}/edit`}>Edit Post</Link>
          </div>
          <div>Delete Post</div>
        </>
      ) : null}

      {paper.toString()}
    </div>
  );
}
