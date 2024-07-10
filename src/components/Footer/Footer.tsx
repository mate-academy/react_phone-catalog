import styles from './Footer.module.scss';

export const Footer = () => {
  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className={styles.footer}>
      <section className={styles.footer__header}>
        <div className={styles['footer__logo-wrapper']}>
          <div className={styles.footer__logo}></div>
        </div>
      </section>

      <section className={styles.footer__links}>
        <ul className={styles['footer__link-list']}>
          <li className={styles.footer__link}>
            <a className={styles.footer__item}>Github</a>
          </li>

          <li className={styles.footer__link}>
            <a className={styles.footer__item}>Contacts</a>
          </li>

          <li className={styles.footer__link}>
            <a className={styles.footer__item}>Rights</a>
          </li>
        </ul>
      </section>

      <section className={styles.footer__back}>
        <div className={styles['footer__back-wrapper']} onClick={scrollTop}>
          <p className={styles['footer__back-text']}>Back to top</p>

          <button className={styles['footer__back-btn']}>
            <div className={styles['footer__back-arrow']}></div>
          </button>
        </div>
      </section>
    </footer>
  );
};
