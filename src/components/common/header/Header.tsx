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
      <div className={styles.headerLanding}>
        <h1>
          Make a note
          <br />
          and present
        </h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non
          consequatur quasi, vel assumenda, accusamus praesentium quibusdam odio
        </p>
        <div className={styles.buttonsContainer}>
          <Link className={styles.primaryButton} href="/register">
            Register now
          </Link>
          <Link href="/demo" className={styles.secondaryButton}>
            How it works
          </Link>
        </div>

        <Image
          src={"assets/notes.svg"}
          alt="note image"
          width={500}
          height={500}
        />
      </div>
    </>
  );
};
