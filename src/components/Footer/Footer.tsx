import styles from './Footer.module.scss';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <a className={styles.logo} href="/" aria-label="Nice Gadgets home">
          NICE
          <br />
          GADGETS
        </a>

        <div className={styles.navLinks}>
          <a
            href="https://github.com/mate-academy/react_phone-catalog"
            target="_blank"
            rel="noreferrer"
          >
            GITHUB
          </a>
          <a
            href="#top"
            onClick={e => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            CONTACTS
          </a>
          <a
            href="#top"
            onClick={e => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            RIGHTS
          </a>
        </div>

        <button onClick={scrollToTop} className={styles.backButton}>
          <span>Back to top</span>
          <span className={styles.arrow}>^</span>
        </button>
      </div>
    </footer>
  );
}
