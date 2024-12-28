import { auth } from "@/auth";
import { PaperForm } from "@/features/papers/components/forms/PaperForm";
import { DefaultTags } from "@/features/papers/server/enums";
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
  const paper = await Paper.findOne({ _id: id });

  if (paper.metadata.owner != session.user.email) return <>Unauthorized User</>;

  return (
    <>
      <PaperForm
        existingPaper={{ ...paper.toObject(), _id: paper._id.toString() }}
        Tags={DefaultTags}
      ></PaperForm>
    </>
  );
}
