import backToTop from '../../assets/icons/footer_icons/backToTop.svg';
import Logo from '../../assets/images/Logo.svg';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <div
          className={`${styles.footer__column} ${styles.footer__column__left}`}
        >
          <div className={styles.footer__logo}>
            <img src={Logo} alt="Logo" />
          </div>
        </div>

        <div className={styles.footer__column}>
          <nav className={styles.footer__nav}>
            <ul className={styles.nav__list}>
              <li className={styles.nav__item}>
                <a
                  href="https://github.com/Uusuff"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li className={styles.nav__item}>
                <a href="#contacts" target="_blank" rel="noopener noreferrer">
                  Contacts
                </a>
              </li>
              <li className={styles.nav__item}>
                <a href="#rights" target="_blank" rel="noopener noreferrer">
                  Rights
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div
          className={`${styles.footer__column} ${styles.footer__column__right}`}
        >
          <button
            className={styles.footer__button}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className={styles.button__text}>Back to top</span>
            <div className={styles.button__img}>
              <img src={backToTop} alt="Back to top" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
