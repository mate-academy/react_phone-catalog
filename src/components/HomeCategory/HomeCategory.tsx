import { CategoryCard } from '../CategoryCard/CategoryCard';
import styles from './HomeCategory.module.scss';

export const HomeCategory = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Shop by category</h2>
      </div>
      <div className={styles.category}>
        <CategoryCard
          img="/img/servic/category1.png"
          name="Mobile phones"
          count={96}
        />
        <CategoryCard
          img="/img/servic/category2.png"
          name="Tablets"
          count={24}
        />
        <CategoryCard
          img="/img/servic/category3.png"
          name="Accessories"
          count={100}
        />
      </div>
    </div>
  );
};
