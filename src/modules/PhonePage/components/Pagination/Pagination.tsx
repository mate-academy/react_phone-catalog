import styles from './Pagination.module.scss';

export const Pagination = () => {
  return (
    <div className={styles.pagination}>
      <div className={`${styles.arrow} ${styles.arrow__left}`}></div>
      <ul>
        <li>
          <a href=""></a>
        </li>
      </ul>
      <div className={`${styles.arrow} ${styles.arrow__right}`}></div>
    </div>
  );
};
