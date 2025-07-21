import styles from './notFound.module.scss';

export const NotFoundPage = () => (
  <div className={styles.container}>
    <span className={styles.sorry}>Oops...</span>
    <h1 className={styles.h1}>Page not found</h1>
  </div>
);
