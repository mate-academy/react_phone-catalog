import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <footer className={styles.footer}>
      <div className={`${styles.footer__container} container`}>
        <Link to={'/'} className={styles.footer__logo}></Link>

        <div className={styles.footer__contacts}>
          <a
            href="https://github.com/clavigo/react_phone-catalog"
            className={styles.footer__contactLink}
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
          <a
            href="https://github.com/clavigo/react_phone-catalog"
            className={styles.footer__contactLink}
            target="_blank"
            rel="noreferrer"
          >
            Contacts
          </a>
          <a
            href="https://github.com/clavigo/react_phone-catalog"
            className={styles.footer__contactLink}
            target="_blank"
            rel="noreferrer"
          >
            Rights
          </a>
        </div>

        <div className={styles.footer__buttonSection}>
          <p>Back to top</p>
          <a className={styles.footer__button} onClick={scrollToTop}></a>
        </div>
      </div>
    </footer>
  );
};
