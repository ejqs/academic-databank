import Link from "next/link";
export default function BrowsePageController({
  CurrentPage,
  CanNextPage,
  CanPreviousPage,
  TotalPages,
  CurrentLimit,
}) {
  return (
    <>
      {Array.from({ length: TotalPages }, (_, i) =>
        CurrentPage === i + 1 ? (
          <span key={i + 1}>{i + 1}</span>
        ) : (
          <Link
            key={i}
            href={`/browse?limit=${CurrentLimit}&page=${i + 1}`}
            style={{ color: "blue" }}
          >
            {i + 1}
          </Link>
        ),
      )}
    </>
  );
}
