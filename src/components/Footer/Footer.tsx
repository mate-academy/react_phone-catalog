import styles from './Footer.module.scss';

//#region svgs
import Logo from '../../icons/Logo.svg';
import Top from '../../icons/top.svg';
//#endregion
export function Footer() {
  return (
    <footer className={styles.footer}>
      <img className={styles.footer__logo} src={Logo} alt="Logo" />
      <div className={styles.footer__contacts}>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footer__link}
        >
          GITHUB
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footer__link}
        >
          CONTACTS
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footer__link}
        >
          RIGHTS
        </a>
      </div>
      <div className={styles.footer__back}>
        <p className={styles.footer__back__text}>Back to top</p>
        <a href="#top" className={styles.footer__back__link}>
          <img src={Top} alt="Back to top" />
        </a>
      </div>
    </footer>
  );
}
