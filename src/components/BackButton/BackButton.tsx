import styles from './BackButton.module.scss';

export const BackButton = () => {
  const handleClick = () => {
    window.history.back();
  };

  return (
    <button onClick={handleClick} className={styles.backButton}>
      Back
    </button>
  );
};
