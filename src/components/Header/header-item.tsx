import React, { ReactNode } from "react";
import Link from "next/link";

export function HeaderItem({ children }: { children?: ReactNode }) {
  return (
    <div className="tw-header-item">
      <Link href="/" className="tw-p-0 tw-m-0 ">
        {children}
      </Link>
    </div>
  );
}
