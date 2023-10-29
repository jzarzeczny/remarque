import styles from "./Logo.module.scss";
import clsx from "clsx";

interface LogoProps {
  revertColors?: boolean;
}

export const Logo = ({ revertColors = false }: LogoProps) => {
  return (
    <div
      className={clsx(
        styles.headerLogo,
        revertColors && styles.headerLogoReverse
      )}
    >
      <span className={styles.headerLogoFirstLetter}>r</span>emarque
    </div>
  );
};
