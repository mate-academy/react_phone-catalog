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
      <div className={styles.container}>
        <div className={styles.logo}>NICE GADGETS</div>

        <a
          href="https://github.com/232567/react_phone-catalog"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.github}
        >
          GitHub
        </a>

        <button
          type="button"
          className={styles.backToTop}
          onClick={handleBackToTop}
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
};
