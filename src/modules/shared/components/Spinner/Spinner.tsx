import styles from './Spinner.module.scss';

export const Spinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner} />
    </div>
  );
};