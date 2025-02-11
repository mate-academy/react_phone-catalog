import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footer__container} container`}>
        <div className={styles.footer__logo}></div>

        <div className={styles.footer__contacts}>
          <a href="" className={styles.footer__contactLink}>
            Github
          </a>
          <a href="" className={styles.footer__contactLink}>
            Contacts
          </a>
          <a href="" className={styles.footer__contactLink}>
            Rights
          </a>
        </div>

        <div className={styles.footer__buttonSection}>
          <p>Back to top</p>
          <a href="#page-start" className={styles.footer__button}></a>
        </div>
      </div>
    </footer>
  );
};
