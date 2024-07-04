import styles from './Skeleton.module.scss';

const Skeleton = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.image}></div>
      <div className={styles.info}>
        <div className={styles.title}></div>
        <div className={styles.price}></div>
      </div>
    </div>
  );
};

export default Skeleton;
