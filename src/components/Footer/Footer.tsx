import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const handleScrollTo = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoLink}>
          <a href="#">
            <img src="/img/logo.svg" alt="Logo" className={styles.logo} />
          </a>
        </div>
        <div className={styles.footerNavUl}>
          <a href="https://github.com/adadiada" className={styles.footerA}>
            GITHUB
          </a>

          <Link to="/contacts" className={styles.footerNav}>
            CONTACTS
          </Link>

          <Link to="/rights" className={styles.footerNav}>
            RIGHTS
          </Link>
        </div>

        <a
          href="#"
          onClick={handleScrollTo}
          className={styles.topBackToTop}
          aria-label="Back to top"
        >
          <p className={styles.topBackToTop}>Back to top</p>
          <img src="/img/vector.svg" alt="vector" className={styles.vector} />
        </a>
      </div>
    </footer>
  );
};
