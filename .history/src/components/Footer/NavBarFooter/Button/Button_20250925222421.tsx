import styles from './Button.module.scss';

export const Button = () => {
  const {theme} = usec
  return (
    <button
      className={styles.button}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      <span className={styles.text}>Back to top</span>

      <div className={styles.circle}>
        <img src="images/Vector Up.svg" />
      </div>
    </button>
  );
};
