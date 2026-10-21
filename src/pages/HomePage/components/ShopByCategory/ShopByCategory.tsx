import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../../../context/ProductsContext';
import { getAssetUrl } from '../../../../utils/assets';
import styles from './ShopByCategory.module.scss';

const categories = [
  {
    to: '/phones',
    title: 'Mobile phones',
    image: 'img/category-phones.png',
    category: 'phones',
  },
  {
    to: '/tablets',
    title: 'Tablets',
    image: 'img/category-tablets.png',
    category: 'tablets',
  },
  {
    to: '/accessories',
    title: 'Accessories',
    image: 'img/category-accessories.png',
    category: 'accessories',
  },
];

export const ShopByCategory = () => {
  const { products } = useProducts();

  const counts = useMemo(() => {
    return products.reduce<Record<string, number>>((accumulator, product) => {
      const nextCount = accumulator[product.category] || 0;

      return {
        ...accumulator,
        [product.category]: nextCount + 1,
      };
    }, {});
  }, [products]);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Shop by category</h2>
      </div>
      <div className={styles.grid}>
        {categories.map(category => (
          <Link key={category.to} to={category.to} className={styles.card}>
            <div className={styles.image}>
              <img src={getAssetUrl(category.image)} alt={category.title} />
            </div>
            <h3 className={styles.name}>{category.title}</h3>
            <span className={styles.count}>
              {counts[category.category] || 0} models
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};
