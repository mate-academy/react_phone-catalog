import styles from './Footer.module.scss';

export const Footer = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <a href="/">
            <img
              src="/img/icons/logo.svg"
              alt="Page Logo"
              className={styles.logo}
            />
          </a>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li>
              <a
                href="https://github.com/A1daros"
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <a href="#" className={styles.link}>
                Contacts
              </a>
            </li>
            <li>
              <a href="#" className={styles.link}>
                Rights
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.backTop}>
          <span className={styles.buttonTopText}>Back to top</span>
          <button
            className={styles.backTopButton}
            onClick={scrollTop}
            aria-label="Back to top"
          >
            <div className={styles.iconWrapper}>
              <img
                src="/img/icons/back-up.svg"
                alt="Back to up"
                aria-hidden="true"
                className={styles.icon}
              />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
