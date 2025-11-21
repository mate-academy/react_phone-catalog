import styles from './agreement.module.scss';

export const Agreement = () => {
  return (
    <div className={styles['checkbox-container']}>
      <input type="checkbox"  className={styles.checkbox} id="data-processing" required />
      <label htmlFor="dataProcessing" className={styles.agreement}>
        I agree to the processing of my personal data
      </label>
    </div>
  );
};
