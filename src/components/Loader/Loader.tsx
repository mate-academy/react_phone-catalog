import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.loader} data-cy="loader">
      Loading
    </div>
  );
};

export default Loader;
