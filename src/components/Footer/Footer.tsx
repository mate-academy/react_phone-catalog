import styles from './Footer.module.scss';

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footerInner}>
      <p>Made with care. Source data from public/api.</p>
      <a
        href="https://github.com/mate-academy/react_phone-catalog"
        target="_blank"
        rel="noreferrer"
        className={styles.link}
      >
        GitHub repo
      </a>
      <button
        type="button"
        className={styles.backButton}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Back to top
      </button>
    </div>
  </footer>
);
