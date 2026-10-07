import styles from './Footer.module.scss';

export const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <a
          href="https://github.com/mate-academy/react_phone-catalog"
          target="_blank"
          rel="noreferrer"
          className={styles.githubLink}
        >
          GITHUB
        </a>

        <button
          type="button"
          className={styles.backToTop}
          onClick={handleBackToTop}
        >
          <span>Back to top</span>
          <span className={styles.arrow}>↑</span>
        </button>
      </div>
    </footer>
  );
};
