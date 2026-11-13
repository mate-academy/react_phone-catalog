import { Link } from 'react-router-dom';
import { getImageUrl } from '../../../../shared/utils/images';
import styles from './ShopByCategory.module.scss';

interface ShopByCategoryProps {
  counts?: Record<string, number>;
}

const CATEGORIES = [
  {
    label: 'Mobile phones',
    category: 'phones',
    path: '/phones',
    image: getImageUrl('/img/category-phones.png'),
  },
  {
    label: 'Tablets',
    category: 'tablets',
    path: '/tablets',
    image: getImageUrl('/img/category-tablets.png'),
  },
  {
    label: 'Accessories',
    category: 'accessories',
    path: '/accessories',
    image: getImageUrl('/img/category-accessories.png'),
  },
];

export const ShopByCategory = ({ counts }: ShopByCategoryProps) => (
  <section className={styles.shop}>
    <h2 className={styles.title}>Shop by category</h2>
    <div className={styles.grid}>
      {CATEGORIES.map(category => (
        <Link key={category.path} to={category.path} className={styles.card}>
          <img
            src={category.image}
            alt={category.label}
            className={styles.image}
          />
          <span className={styles.label}>{category.label}</span>
          <span className={styles.count}>
            {counts?.[category.category] ?? 0} models
          </span>
        </Link>
      ))}
    </div>
  </section>
);
