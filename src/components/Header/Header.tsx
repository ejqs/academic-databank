import React from "react";
import { AuthButton } from "@components/index";
import styles from "./Header.module.css";
import { ProjectMetadata } from "@/util/types";
import Link from "next/link";

// TODO: Include version number in Title
export async function Header() {
  return (
    <>
      <div className={`${styles.container}`}>
        <div className={`${styles.items} ${styles.item} `}>
          {/* Extra div to wrap animation properly */}
          <div className="header-item">
            <Link href="/" className="tw-p-0 tw-m-0 ">
              {ProjectMetadata.appName}
            </Link>
          </div>
        </div>
        <div className={`${styles.items} ${styles.item}`}>
          <AuthButton />
        </div>
      </div>
    </>
  );
}
