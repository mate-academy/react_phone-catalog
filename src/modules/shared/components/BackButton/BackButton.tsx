import styles from './BackButton.module.scss';

export const BackButton = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <button onClick={handleBack} className={styles.backButton}>
      Back
    </button>
  );
};
