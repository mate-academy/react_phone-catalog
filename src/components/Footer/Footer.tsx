import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const scrollToTop = () => {
    document.body.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Link to={'/'} className={styles.footer__logoLink}>
          <img
            src="/img/footer-logo.png"
            alt="Logo"
            className={styles.footer__logo}
          />
        </Link>
        <div className={styles.footer__linksContainer}>
          <Link
            to="https://github.com/kovaden414"
            target="_blank"
            className={styles.footer__link}
          >
            Github
          </Link>
          <Link
            to="https://github.com/kovaden414"
            target="_blank"
            className={styles.footer__link}
          >
            Contacts
          </Link>
          <Link
            to="https://github.com/kovaden414"
            target="_blank"
            className={styles.footer__link}
          >
            Rights
          </Link>
        </div>
        <div className={styles.footer__backToTop}>
          <button
            className={styles.footer__backToTopText}
            onClick={() => scrollToTop()}
          >
            Back to top
          </button>

          <button
            className={styles.footer__backToTopButton}
            onClick={() => scrollToTop()}
          />
        </div>
      </div>
    </footer>
  );
};
