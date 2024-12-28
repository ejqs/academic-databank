"use client";

import Link from "next/link";

export default function BrowseCards({ papers }) {
  if (!papers) {
    return <h1>No Papers</h1>;
  }

  console.log(papers);

  return (
    <>
      {papers.map((paper) => (
        <Link key={paper._id.toString()} href={`${paper._id.toString()}`}>
          <li key={paper._id.toString()} style={{ marginBottom: "20px" }}>
            <h2>{paper.title}</h2>
          </li>
        </Link>
      ))}
    </>
  );
}
