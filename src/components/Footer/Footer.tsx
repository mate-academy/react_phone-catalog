import styles from './Footer.module.scss';

export const Footer = () => {
  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>
          <a
            href="https://github.com/mate-academy/react_phone-catalog"
            target="_blank"
            rel="noreferrer"
          >
            GitHub repository
          </a>
        </p>
        <button
          type="button"
          className={styles.backButton}
          onClick={handleBack}
        >
          Back to top
        </button>
      </div>
    </footer>
  );
};
