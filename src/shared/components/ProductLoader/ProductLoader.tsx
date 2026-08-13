import styles from './ProductLoader.module.scss';

export const ProductLoader = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.spinner__spin}></div>
    </div>
  );
};
