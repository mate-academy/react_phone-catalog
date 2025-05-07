import styles from './BackToTop.module.scss';

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const BackToTop = () => {
  return (
    <button className={styles.toTopBtn} onClick={scrollToTop}>
      <p>Back to top</p>
      <img src="img/icons/slider-button.svg" alt="" />
    </button>
  );
};
