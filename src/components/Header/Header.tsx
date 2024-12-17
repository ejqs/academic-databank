import React from "react";
import AuthButton from "@components/auth-button";
import strings from "@/strings";
import styles from "./Header.module.css";

// TODO: Include version number in Title
export default function Header() {
  return (
    <>
      <div className={`${styles.container}`}>
        <div className={`${styles.items} ${styles.item} tw-animate-bounce`}>
          {strings.appName}
        </div>
        <div className={`${styles.items} ${styles.item}`}>
          <AuthButton />
        </div>
      </div>
    </>
  );
}
