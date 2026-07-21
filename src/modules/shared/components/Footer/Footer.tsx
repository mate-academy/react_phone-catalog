import styles from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footer}>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className={styles.logo}
        >
          GitHub
        </a>

        <button
          type="button"
          className={styles.backToTop}
          onClick={scrollToTop}
        >
          Back to top
        </button>
      </div>
    </footer>
  );
};
