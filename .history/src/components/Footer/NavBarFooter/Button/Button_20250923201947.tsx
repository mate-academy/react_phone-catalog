import styles from './Button.module.scss';

export const Button = () => {
  return (
    <button
      className={styles.button}
      onClick={() => {
        window.scrollTo(0, 0);
      }}
    >
      <span className={styles.text}>Back to top</span>

      <div className={styles.circle}>
        <img src="images/Vector Up).svg" />
      </div>
    </button>
  );
};
