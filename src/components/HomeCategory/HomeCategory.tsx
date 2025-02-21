import { Link } from 'react-router-dom';
import { CategoryCard } from '../CategoryCard/CategoryCard';
import styles from './HomeCategory.module.scss';

export const HomeCategory = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Shop by category</h2>
      </div>
      <div className={styles.category}>
        <Link to={`/products?category=phones`}>
          <CategoryCard
            img="/img/servic/category1.png"
            name="Mobile phones"
            count={96}
          />
        </Link>
        <Link to={`/products?category=tablets`}>
          <CategoryCard
            img="/img/servic/category2.png"
            name="Tablets"
            count={24}
          />
        </Link>
        <Link to={`/products?category=accessories`}>
          <CategoryCard
            img="/img/servic/category3.png"
            name="Accessories"
            count={100}
          />
        </Link>
      </div>
    </div>
  );
};
