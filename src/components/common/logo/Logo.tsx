import styles from "./Logo.module.scss";

export const Logo = () => {
  return (
    <div className={styles.headerLogo}>
      <span className={styles.headerLogoFirstLetter}>r</span>emarque
    </div>
  );
};
