/* eslint-disable prettier/prettier */
import styles from './Footer.module.scss';

export const Footer = () => {
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copy}>© 2026 Nice Gadgets</p>

        <img
          src="/img/logo/logo.png"
          alt="Nice Gadgets"
          className={styles.logo}
        />

        <div className={styles.right}>
          <a
            href="https://github.com/ericagomes-dev"
            target="_blank"
            rel="noreferrer"
            className={styles.github}
          >
            GitHub
          </a>

          <button type="button" className={styles.top} onClick={backToTop}>
            Back to top
            <img src="/img/icons/arrow-up.png" alt="Top" />
          </button>
        </div>
      </div>
    </footer>
  );
};
