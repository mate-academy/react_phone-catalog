import styles from './Loader.module.scss';

export const Loader = () => (
  <div className={styles.block} data-cy="loader">
    <div className={styles.content} />
  </div>
);
