import React from "react";
import { AuthButton } from "@components/index";
import { ProjectMetadata } from "@/util/types";
import Link from "next/link";

// TODO: Include version number in Title
// TODO: make x margins smaller as resized into a smaller window
export async function Header() {
  return (
    <>
      <div className={`tw-flex tw-justify-between tw-mx-36 tw-my-6 tw-text-xl`}>
        <div>
          {/* Extra div to wrap animation properly */}
          <div className="header-item">
            <Link href="/" className="tw-p-0 tw-m-0 ">
              {ProjectMetadata.appName}
            </Link>
          </div>
        </div>
        <div>
          <Link href={"/create"}>Add Paper</Link>
          <AuthButton />
        </div>
      </div>
    </>
  );
}
