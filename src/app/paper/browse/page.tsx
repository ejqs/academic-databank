import { ensureDBConnection } from "@/lib/ensureDB";
import Paper from "@/features/papers/server/model/Paper";

import Link from "next/link";
import BrowsePageController from "@/features/papers/components/BrowsePageController";
import BrowseCards from "@/features/papers/components/BrowseList";

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
    page: Number(page),
    limit: Number(limit),
  };

  console.log(options);
  // Has error for some reason but it works. 🤷‍♂️

  if (query) {
  }

  const papers = await Paper.paginate(
    { "metadata.visibility": { $in: ["public"] } },
    options,
  );

  // TODO: Remove console.log
  console.log(papers);

  return (
    <>
      <BrowseCards
        papers={papers?.docs.map((paper: any) => ({
          ...paper.basic.toObject(),
          _id: paper._id.toString(),
        }))}
      ></BrowseCards>

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
