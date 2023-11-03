import { Logo } from "../logo/Logo";
import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Logo revertColors={true} />
      <p>@2023 Coded by Jakub Zarzeczny</p>
      <a href="">Linkedin</a>
      <a href="">Github</a>
    </footer>
  );
};
