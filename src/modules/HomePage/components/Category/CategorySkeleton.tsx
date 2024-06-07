import styles from './Category.module.scss';
import classNames from 'classnames';

export const CategorySkeleton = () => (
  <div className={classNames(styles.container, styles.skeleton)}>
    <h1 className={styles.skeleton__header} />
    <div className={styles.skeleton__list}>
      <div className={styles.skeleton__card} />
      <div className={styles.skeleton__card} />
      <div className={styles.skeleton__card} />
    </div>
  </div>
);
