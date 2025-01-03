import React from "react";
import { AuthButton } from "@components/index";
import { ProjectMetadata } from "@/util/types";
import Link from "next/link";
import StorageIcon from "@mui/icons-material/Storage";
import { HeaderItem } from "./header-item";

// TODO: Include version number in Title
// TODO: make x margins smaller as resized into a smaller window
export async function Header() {
  return (
    <>
      <div
        className={`tw-flex tw-justify-between tw-mx-36 tw-my-6 tw-text-xl tw-flex-row tw-items-center`}
      >
        <div>
          {/* Extra div to wrap animation properly */}
          <HeaderItem>
            {" "}
            <StorageIcon color="primary" sx={{ fontSize: 70 }} />
          </HeaderItem>
        </div>
        <div>
          <AuthButton className="tw-text-2xl tw-border-2 tw-border-solid tw-px-3 tw-py-1 tw-header-item" />
        </div>
      </div>
    </>
  );
}
