import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.loader} data-cy="Loader">
      <div className={styles.spinner} />
    </div>
  );
};
