import styles from "./Footer.module.css";
import strings from "@/strings";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.item}>
            ©{strings.copyrightYear} {strings.orgAcronym}
          </div>
          <div className={styles.item}>{strings.aboutFooter}</div>
          <div className={styles.item}>{strings.securityFooter}</div>
          <div className={styles.item}>{strings.githubFooter}</div>
          <div className={styles.item}>{strings.contactFooter}</div>
        </div>
      </footer>
    </>
  );
}
