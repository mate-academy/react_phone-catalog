import styles from './BackToTop.module.scss';

export const BackToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <button className={styles.BackToTop} onClick={scrollToTop}>
      <p>Back to top</p>
      <span className={styles.icon}></span>
    </button>
  );
};
