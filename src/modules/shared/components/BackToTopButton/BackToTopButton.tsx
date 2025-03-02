import styles from './BackToTopButton.module.scss';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const BackToTopButton = () => {
  return (
    <button className={styles.button} onClick={scrollToTop} aria-label="Scroll to top">
      <span className={styles.text}>Back to top</span>
      <img
        src={`${process.env.PUBLIC_URL}/img/icons/backToTop-icon.svg`}
        alt="Up arrow"
        className={styles.icon}
      />
    </button>
  );
};
