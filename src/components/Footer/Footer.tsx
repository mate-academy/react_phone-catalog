import styles from './Footer.module.scss';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <a
          href="https://github.com/egorfomin419/react_phone-catalog"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.logo}
        >
          NICE
          <span>GADGETS</span>
        </a>

        <a
          href="https://github.com/egorfomin419/react_phone-catalog"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Github
        </a>

        <button
          type="button"
          className={styles.backToTop}
          onClick={scrollToTop}
        >
          Back to top
          <span className={styles.arrow}>↑</span>
        </button>
      </div>
    </footer>
  );
};
