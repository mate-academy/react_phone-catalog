import styles from './Footer.module.scss';
import Logo from '../../../../assets/images/Logo.png';
import arrowTop from '../../../../assets/images/arrow-top.svg';

export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__logoContainer}>
        <img
          className={styles.footer__logo}
          src={Logo}
          alt="Nice Gadgets Logo"
        />
      </div>

      <nav className={styles.footer__nav}>
        <ul className={styles.footer__links}>
          <li className={styles.footer__item}>
            <a
              href="https://github.com/skoulskiy/react_phone-catalog"
              target="_blank"
              rel="noreferrer"
              className={styles.footer__link}
            >
              GITHUB
            </a>
          </li>
          <li className={styles.footer__item}>
            <a
              href="/#/contacts"
              rel="noreferrer"
              className={styles.footer__link}
            >
              CONTACTS
            </a>
          </li>
          <li className={styles.footer__item}>
            <a
              href="/#/rights"
              rel="noreferrer"
              className={styles.footer__link}
            >
              RIGHTS
            </a>
          </li>
        </ul>
      </nav>

      <div className={styles.footer__scrollControl}>
        <button
          type="button"
          onClick={handleScrollToTop}
          className={styles.footer__scrollTopBtn}
        >
          <span className={styles.footer__scrollTopText}>Back to top</span>
          <div className={styles.footer__scrollTopIcon}>
            <img src={arrowTop} alt="Scroll to top arrow" />
          </div>
        </button>
      </div>
    </footer>
  );
};
