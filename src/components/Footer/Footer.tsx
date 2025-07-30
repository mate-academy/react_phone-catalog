import { Logo } from "../Logo";
import styles from "./Footer.module.scss";

export const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <Logo />

    <ul className={styles.list}>
      <li className={`uppercaseText`}>
        <a href="">github</a>
      </li>
      <li className={`uppercaseText`}>
        <a href="">contacts</a>
      </li>
      <li className={`uppercaseText`}>
        <a href="">rights</a>
      </li>
    </ul>

    <div className="">
      <p>Back to top</p>
    </div>
  </footer>
);
