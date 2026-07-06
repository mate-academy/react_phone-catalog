import styles from './BackToTopButton.module.scss';

export const BackToTopButton = ({ className = '' }) => {
  return (
    <div className={`${styles.buttonBlock} ${className}`}>
      <p className={`small-text ${styles.buttonText}`}>Back to top</p>
      <button
        className={styles.button}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span className={styles.icon} aria-hidden="true" />
      </button>
    </div>
  );
};
