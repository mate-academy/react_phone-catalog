import styles from './Footer.module.scss';

export const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <a
          className={styles.githubLink}
          href="https://github.com/Dimeydimonov/react_phone-catalog"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-github" /> Github
        </a>

        <nav className={styles.links}>
          <a className={styles.link} href="mailto:store@nicegadgets.com">
            Contacts
          </a>
          <span className={styles.link}>rights</span>
        </nav>

        <button
          type="button"
          className={styles.backToTop}
          onClick={handleBackToTop}
        >
          Back to top
          <i className="fas fa-arrow-up" />
        </button>
      </div>
    </footer>
  );
};
