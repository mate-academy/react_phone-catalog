import styles from './BackToTopButton.module.scss';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const BackToTopButton = () => {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <button
      className={styles.button}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <span className={styles.text}>Back to top</span>
      <img
        src={`${baseUrl}img/icons/backToTop-icon.svg`}
        alt="Up arrow"
        className={styles.icon}
      />
    </button>
  );
};
