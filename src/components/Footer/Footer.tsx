import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__logo}></div>

      <div className={styles.footer__contacts}>
        <p>Github</p>
        <p>Contacts</p>
        <p>Rights</p>
      </div>

      <div className={styles.footer__buttonSection}>
        <p>Back to top</p>
        <a href="#page-start" className={styles.footer__button}></a>
      </div>
    </footer>
  );
};
