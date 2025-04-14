import styles from './Footer.module.scss';

export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // плавна прокрутка
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <a href="#" className={styles.footer__logoLink}>
          <img
            src="src/assets/icons/footer-icons/footer__logo.svg"
            alt="Логотип"
            className={styles.footer__logo}
          />
        </a>

        <nav className={styles.footer__nav}>
          <ul className={styles.footer__list}>
            <li className={styles.footer__item}>
              <a href="#" className={styles.footer__link}>
                Github
              </a>
            </li>
            <li className={styles.footer__item}>
              <a href="#" className={styles.footer__link}>
                Contacts
              </a>
            </li>
            <li className={styles.footer__item}>
              <a href="#" className={styles.footer__link}>
                Rights
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.footer__wrapper}>
          <p className={styles.footer__backTop}>Back to top</p>
          <button
            className={styles.footer__backTopLink}
            onClick={handleScrollToTop}
          >
            <img
              src="src/assets/icons/footer-icons/scroll-to-top.svg"
              alt="Стрілка"
              className={styles.footer__arrow}
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
