import { ensureDBConnection } from "@/lib/ensureDB";
import Paper from "@/features/papers/server/model/Paper";
import { paginate } from "mongoose-paginate-v2";
import Link from "next/link";
import BrowsePageController from "@/features/papers/components/BrowsePageController";

// import { IPaper } from "@/features/papers/server/model/Paper";
// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching

// TODO: Implement ISR https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration
// By default because of searchParams, page is dynamic.
// "searchParams is a Dynamic API whose values cannot be known ahead of time.
// Using it will opt the page into dynamic rendering at request time."
// https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional
export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  // Search Params: https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional
}) {
  await ensureDBConnection();
  // const papers = await Paper.find({});

  // example https://www.google.com/search?q=test&num=10
  // const filters = (await params).filters;
  const {
    page = "1",
    sort = "asc",
    query = "",
    limit = "10",
  } = await searchParams;

  const options = {
    page: page,
    limit: limit,
  };

  console.log(options);
  // Has error for some reason but it works. 🤷‍♂️
  const papers = await Paper.paginate({}, options);

  // TODO: Remove console.log
  console.log(papers);
  // console.log(err);

  return (
    <>
      {papers?.docs.map((paper) => (
        <Link key={paper._id.toString()} href={`paper/${paper._id.toString()}`}>
          <li key={paper._id} style={{ marginBottom: "20px" }}>
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
        </Link>
      ))}
      <BrowsePageController
        CurrentPage={papers.page}
        CanNextPage={papers.hasNextPage}
        CanPreviousPage={papers.hasPrevPage}
        TotalPages={papers.totalPages}
        CurrentLimit={papers.limit}
      ></BrowsePageController>
    </>
  );
}
