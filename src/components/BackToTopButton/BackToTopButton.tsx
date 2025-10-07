import styles from './BackToTopButton.module.scss';

export const BackToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button className={styles.backToTop} onClick={scrollToTop}>
      Back to top
      <img
        src="/img/ArrowRigh.svg"
        alt="ArrowRigh"
        className={styles.backToTopArrow}
      />
    </button>
  );
};
