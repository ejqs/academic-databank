import { ensureDBConnection } from "@/lib/ensureDB";
import Paper from "@/features/papers/server/model/Paper";
import { IPaper } from "@/features/papers/server/model/Paper";
// import PapersList from "./PapersList";

export default async function Browse() {
  await ensureDBConnection();
  const papers: IPaper[] = await Paper.find({});
  return (
    <>
      {papers?.map((paper) => (
        <li key={paper.id} style={{ marginBottom: "20px" }}>
          <h2>{paper.title}</h2>
          <p>
            <strong>Authors:</strong> {paper.authors.join(", ")}
          </p>
          <p>
            <strong>Abstract:</strong> {paper.abstract}
          </p>
          <p>
            <strong>Tags:</strong> {paper.tags.join(", ")}
          </p>
          <p>
            <strong>Department:</strong> {paper.department}
          </p>
          <p>
            <strong>Date:</strong> {new Date(paper.date).toLocaleDateString()}
          </p>
          <p>
            <strong>Upvotes:</strong> {paper.meta.upvotes}
          </p>
          <p>
            <strong>Favorites:</strong> {paper.meta.favorite}
          </p>
          {paper.hiddenByAdmin && (
            <p style={{ color: "red" }}>This paper is hidden by the admin.</p>
          )}
        </li>
      ))}
    </>
  );
}
