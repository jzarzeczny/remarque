import Link from "next/link";
import styles from "./Header.module.scss";
import { CiLogin } from "react-icons/ci";
import Image from "next/image";

export const Header = () => {
  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.headerLogo}>
          <span className={styles.headerLogoFirstLetter}>r</span>emarque
        </div>

        <nav className={styles.navigation}>
          <ul>
            <Link className={styles.navigationElement} href={"/"}>
              Home
            </Link>

            <Link className={styles.navigationElement} href={"/"}>
              Demo
            </Link>

            <Link className={styles.navigationElement} href={"/"}>
              Contact us
            </Link>
          </ul>
        </nav>

        <Link className={styles.loginAnchor} href={"/login"}>
          <CiLogin size="1.5rem" />
          Login
        </Link>
      </header>
    </>
  );
};
