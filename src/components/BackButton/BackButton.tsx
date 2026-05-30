import styles from './BackButton.module.scss';

const BackButton = () => {
  const forwardBack = () => {
    window.history.back();
  };

  return (
    <button onClick={forwardBack} className={styles.backButton}>
      &lt; Back
    </button>
  );
};

export default BackButton;
