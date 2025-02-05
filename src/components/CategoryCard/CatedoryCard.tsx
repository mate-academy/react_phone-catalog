import styles from './CategoryCard.module.scss';

export const CategoryCard = () => {
  return (
    <div className={styles.category}>
      <div className={styles.category__img}></div>

      <div className={styles.category__description}>
        <h4>Mobile phones</h4>

        <p>95 models</p>
      </div>
    </div>
  );
};
