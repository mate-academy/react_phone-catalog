import styles from './ProductCardSkeleton.module.scss';

export const ProductCardSkeleton = () => (
  <div className={styles.skeleton__Container}>
    <div className={styles.skeleton__Image} />
    <div className={styles.skeleton__Title} />
    <div className={styles.skeleton__Price} />
    <div className={styles.skeleton__Specs}>
      <div className={styles.skeleton__SpecLine} />
      <div className={styles.skeleton__SpecLine} />
      <div className={styles.skeleton__SpecLine} />
    </div>
    <div className={styles.skeleton__Buttons}>
      <div className={styles.skeleton__Button} />
      <div className={styles.skeleton__Button} />
    </div>
  </div>
);
