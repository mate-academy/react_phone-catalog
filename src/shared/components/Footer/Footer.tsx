import styles from './Footer.module.scss';
export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footer__content}>
          <a href="#" className={styles.footer__logo}>
            <img src={`${import.meta.env.BASE_URL}/img/icons/logo.svg`}
             alt="logo"></img>
          </a>

          <nav>
            <ul className={styles.nav__list}>
              <li className={styles.nav__item}>
                <a
                  className={styles.nav__link}
                  target="_blank"
                  href="https://github.com/ValentynaITCh/react_phone-catalog"
                  rel="noreferrer"
                >
                  Github
                </a>
              </li>
              <li className={styles.nav__item}>
                <a
                  href="https://github.com/ValentynaITCh"
                  target="_blank"
                  className={styles.nav__link}
                  rel="noreferrer"
                >
                  Contacts
                </a>
              </li>
              <li className={styles.nav__item}>
                <a href="#" className={styles.nav__link}>
                  rights
                </a>
              </li>
            </ul>
          </nav>
          <button
            type="button"
            className={styles.footer__button}
            onClick={handleScrollToTop}
          >
            Back to top
            <span className={styles.footer__icon}>
              <img
                src={`${import.meta.env.BASE_URL}/img/buttons/arrow-up.png`}
                 alt="button-arrow-up"
              />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
