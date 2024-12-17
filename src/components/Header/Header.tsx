import React from "react";
import AuthButton from "@components/auth-button";
import styles from "./Header.module.css";
import { ProjectMetadata } from "@/util/types";

// TODO: Include version number in Title
export default function Header() {
  return (
    <>
      <div className={`${styles.container}`}>
        <div className={`${styles.items} ${styles.item} tw-animate-bounce`}>
          {ProjectMetadata.appName}
        </div>
        <div className={`${styles.items} ${styles.item}`}>
          <AuthButton />
        </div>
      </div>
    </>
  );
}
