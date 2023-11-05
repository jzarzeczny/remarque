import { Logo } from "../logo/Logo";
import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Logo revertColors={true} />
      <p>@2023 Coded by Jakub Zarzeczny</p>
      <a href="https://www.linkedin.com/in/jakub-zarzeczny-135732218/">
        Linkedin
      </a>
      <a href="https://github.com/jzarzeczny">Github</a>
    </footer>
  );
};
