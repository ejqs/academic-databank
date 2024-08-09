import styles from "./Footer.module.css";
import config from "@/config";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.item}>
            ©{config.copyrightYear} {config.orgAcronym}
          </div>
          <div className={styles.item}>{config.aboutFooter}</div>
          <div className={styles.item}>{config.securityFooter}</div>
          <div className={styles.item}>{config.githubFooter}</div>
          <div className={styles.item}>{config.contactFooter}</div>
        </div>
      </footer>
    </>
  );
}
