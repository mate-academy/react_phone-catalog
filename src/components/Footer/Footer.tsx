import styles from './Footer.module.scss';

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.inner}>
      <a
        href="https://github.com/fmoreira85/react_phone-catalog"
        target="_blank"
        rel="noreferrer"
        className={styles.link}
      >
        View GitHub repo
      </a>

      <button
        type="button"
        className={styles.button}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Back to top
        <i className="fa-solid fa-arrow-up-long" />
      </button>
    </div>
  </footer>
);
