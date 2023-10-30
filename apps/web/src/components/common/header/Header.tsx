"use client";

import Link from "next/link";
import styles from "./Header.module.scss";
import { CiLogin } from "react-icons/ci";
import { Logo } from "../logo/Logo";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export const Header = () => {
  const pathname = usePathname();

  return (
    <>
      <header
        className={clsx(
          styles.headerContainer,
          pathname !== "/" && styles.headerContainerOverflowFix
        )}
      >
        <Logo />
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
