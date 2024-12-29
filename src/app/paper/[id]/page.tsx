import { auth } from "@/auth";
import { deletePaper } from "@/features/papers/server/actions";
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
  const paper = await Paper.findById(id);

  const session = await auth();
  if (!session?.user) return <>Unauthorized</>;
  if (!paper) return <>Paper does not exist! It might have been deleted. </>;

  return (
    <div>
      {session.user.email === paper.metadata.owner ? (
        <>
          <div>
            <Link href={`${id}/edit`}>Edit Post</Link>
          </div>
          <div>
            <Link href={`${id}/delete`}>Delete Post</Link>
          </div>
        </>
      ) : null}

      {paper.toString()}
    </div>
  );
}
