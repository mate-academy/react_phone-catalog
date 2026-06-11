import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <>
      <div className={styles.loader} data-cy="loader"></div>
      <p className={styles.loading}>Loading</p>
    </>
  );
};

export default Loader;
