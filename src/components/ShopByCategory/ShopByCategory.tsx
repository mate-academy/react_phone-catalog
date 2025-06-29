import styles from './ShopByCategory.module.scss';

import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { categories } from '../../constants/categories';
import { useProducts } from '../../context/useProducts';

export const ShopByCategory: React.FC = () => {
  const { products } = useProducts();

  const categoriesWithCount = useMemo(() => {
    if (!products.length) {
      return categories.map(cat => ({ ...cat, count: 0 }));
    }

    return categories.map(category => {
      const count = products.filter(
        product => product.category === category.name,
      ).length;

      return { ...category, count };
    });
  }, [products]);

  return (
    <section className={styles.shopByCategory}>
      <h2 className={styles.shopByCategory__heading}>Shop by category</h2>
      <div className={styles.shopByCategory__container}>
        {categoriesWithCount.map(category => (
          <div key={category.path} className={styles.shopByCategory__banner}>
            <Link
              to={category.path}
              className={styles.shopByCategory__bannerImageWrapper}
              style={{ backgroundColor: category.backgroundColor }}
            >
              <img
                src={category.imageUrl}
                alt={category.title}
                className={styles.shopByCategory__bannerImage}
              />
            </Link>

            <h4 className={styles.shopByCategory__bannerTitle}>
              {category.title}
            </h4>
            <p className={styles.shopByCategory__bannerCount}>
              {category.count} models
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
