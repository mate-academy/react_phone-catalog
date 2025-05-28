import { Link } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';
import { useCategories } from '../../../../hooks/useCategories';

const categories = [
  {
    name: 'Phones',
    image: './img/category-phones-1.png',
    path: '/phones',
    type: 'phone',
  },
  {
    name: 'Tablets',
    image: './img/category-tablets-1.png',
    path: '/tablets',
    type: 'tablet',
  },
  {
    name: 'Accessories',
    image: './img/category-accessories-1.png',
    path: '/accessories',
    type: 'accessory',
  },
];

export const ShopByCategory: React.FC = () => {
  const { phonesCount, tabletsCount, accessoriesCount, loading, error } =
    useCategories();

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>Failed to load categories.</div>;
  }

  const countsMap: Record<string, number> = {
    phone: phonesCount,
    tablet: tabletsCount,
    accessory: accessoriesCount,
  };

  return (
    <section className={styles.shopByCategory}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.categories}>
        {categories.map(category => (
          <Link
            to={category.path}
            key={category.name}
            className={styles.category}
          >
            <img
              src={category.image}
              alt={category.name}
              className={styles.image}
            />
            <h3 className={styles.name}>{category.name}</h3>
            <p className={styles.count}>{countsMap[category.type]} models</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
