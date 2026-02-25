import styles from './Footer.module.scss';

export const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo}>
          <span>NICE🔥</span>
          <span>GADGETS</span>
        </a>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <a
                href="https://github.com/SerhiyDmytruk/"
                className={styles.navLink}
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <a href="/contacts" className={styles.navLink}>
                Contacts
              </a>
            </li>
            <li>
              <a href="/rights" className={styles.navLink}>
                Rights
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.backToTop}>
          <span className={styles.backToTopText}>Back to top</span>
          <button
            type="button"
            className={styles.backToTopBtn}
            onClick={handleBackToTop}
          >
            <i className="fas fa-chevron-up" />
          </button>
        </div>
      </div>
    </footer>
  );
};
