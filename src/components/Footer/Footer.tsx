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
      <div className={styles.content}>
        <div className={styles.logo}>
          <span>NICE</span>
          <span>GADGETS</span>
        </div>

        <a
          className={styles.github}
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>

        <button
          className={styles.topButton}
          type="button"
          onClick={handleBackToTop}
        >
          Back to top
          <span>
            <i className="fa-solid fa-chevron-up" />
          </span>
        </button>
      </div>
    </footer>
  );
};
