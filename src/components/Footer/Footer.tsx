import { ProjectMetadata } from "@/util/types";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.item}>
            ©{ProjectMetadata.copyrightYear} {ProjectMetadata.orgAcronym}
          </div>
          <div className={styles.item}>{ProjectMetadata.aboutFooter}</div>
          <div className={styles.item}>{ProjectMetadata.securityFooter}</div>
          <div className={styles.item}>{ProjectMetadata.githubFooter}</div>
          <div className={styles.item}>{ProjectMetadata.contactFooter}</div>
        </div>
      </footer>
    </>
  );
}
