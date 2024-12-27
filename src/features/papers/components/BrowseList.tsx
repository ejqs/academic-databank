"use client";

import Link from "next/link";

export default function BrowseCards({ papers }) {
  if (!papers) {
    return <h1>LOADING!!</h1>;
  }

  return (
    <>
      {papers?.docs?.map((paper) => (
        <Link key={paper._id.toString()} href={`paper/${paper._id.toString()}`}>
          <li key={paper._id.toString()} style={{ marginBottom: "20px" }}>
            <h2>{paper.basic.title}</h2>
          </li>
        </Link>
      ))}
    </>
  );
}
