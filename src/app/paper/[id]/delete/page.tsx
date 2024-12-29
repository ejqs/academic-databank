// Lol idk if this is best practice

import { auth } from "@/auth";
import Paper from "@/features/papers/server/model/Paper";
import { ensureDBConnection } from "@/lib/ensureDB";

export default async function EditPaperPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await ensureDBConnection();
  const session = await auth();
  if (!session?.user) return null;
  const id = (await params).id;
  const paper = await Paper.findById(id);
  if (!paper) return <>Paper does not exist! It might have been deleted. </>;
  if (paper.metadata.owner != session.user.email) return <>Unauthorized User</>;
  try {
    await Paper.findByIdAndDelete(id);
    return <>Paper Deleted Successfully</>;
  } catch (e) {
    // TODO: Not sure if this works.
    return <>Paper Not Deleted Successfully {e.toString()}</>;
  }
}
