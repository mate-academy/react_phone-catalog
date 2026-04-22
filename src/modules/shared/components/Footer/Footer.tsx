import styles from './Footer.module.scss';

export const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <a href="/" className={styles.logo} aria-label="Go to home">
          <img src="/img/icons/Logo.svg" alt="Nice Gadgets logo" />
        </a>

        <nav aria-label="Footer navigation">
          <ul className={styles.navList}>
            <li>
              <a
                href="https://github.com"
                className={styles.navLink}
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <a href="#" className={styles.navLink}>
                Contacts
              </a>
            </li>
            <li>
              <a href="#" className={styles.navLink}>
                Rights
              </a>
            </li>
          </ul>
        </nav>

        <button className={styles.backToTop} onClick={handleBackToTop}>
          Back to top
        </button>
      </div>
    </footer>
  );
};
