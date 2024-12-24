import Paper from "@/features/papers/server/model/Paper";

import { ensureDBConnection } from "@/lib/ensureDB";

export default async function BrowsePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await ensureDBConnection();
  const id = (await params).id;
  const paper = await Paper.findOne({ _id: id });
  return <div>My Post: {paper.toString()}</div>;
}
