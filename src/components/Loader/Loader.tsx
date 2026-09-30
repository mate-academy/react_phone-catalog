import styles from './Loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={styles.loaderContainer} data-cy="loader">
      <div className={styles.spinner} />
    </div>
  );
};
