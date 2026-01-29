import styles from '/src/components/Footer/Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <img src="./img/logo.svg" alt="logo" className={styles.footer__logo} />

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

      <div className={styles.footer__back}>
        <p className={styles.footer__back__text}>Back to top</p>
        <button
          className={styles.footer__back__button}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        ></button>
      </div>
    </footer>
  );
};
