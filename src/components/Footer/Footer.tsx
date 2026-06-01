import styles from './Footer.module.scss';

export const Footer = () => {
  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <span className={styles.logo}>Nice Gadgets</span>
        <nav className={styles.links}>
          <a
            href="https://github.com/mate-academy/react_phone-catalog"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a href="mailto:hello@nice-gadgets.dev">Contacts</a>
          <a href="/">Rights</a>
        </nav>
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
