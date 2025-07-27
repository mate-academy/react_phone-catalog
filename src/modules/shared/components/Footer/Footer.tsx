import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <>
      <div className={styles.footer}>
        <Link to="/">
          <img
            className={styles.footer__logo}
            src="./icons/Logo.svg"
            alt="logo image"
          />
        </Link>
        <div className={styles.footer__container}>
          <a className={styles.footer__link} href="https://github.com/nex1994">
            GitHub
          </a>
          <a
            className={styles.footer__link}
            href="https://www.linkedin.com/in/jakub-bilicki/"
          >
            Contact
          </a>
          <a className={styles.footer__link} href="https://github.com/nex1994">
            Rights
          </a>
        </div>
        <div className={styles['footer__back-to-top']}>
          <p className={styles['footer__back-to-top--paragraph']}>
            Back to top
          </p>
          <a onClick={() => window.scrollTo(0, 0)}>
            <img
              src="./icons/ArrowUp.svg"
              className={styles['footer__back-to-top--button']}
            />
          </a>
        </div>
      </div>
    </>
  );
};
