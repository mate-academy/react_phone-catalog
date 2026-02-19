import { Link } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';

const CATEGORIES = [
  {
    id: 'phones',
    label: 'Mobile phones',
    count: 95,
    image: 'img/category-phones.webp',
    bg: '#6d6474',
    to: '/phones',
  },
  {
    id: 'tablets',
    label: 'Tablets',
    count: 24,
    image: 'img/category-tablets.webp',
    bg: '#8d8d92',
    to: '/tablets',
  },
  {
    id: 'accessories',
    label: 'Accessories',
    count: 100,
    image: 'img/category-accessories.webp',
    bg: '#c6a285',
    to: '/accessories',
  },
];

export const ShopByCategory = () => (
  <section className={styles.section}>
    <h2 className={styles.title}>Shop by category</h2>
    <div className={styles.grid}>
      {CATEGORIES.map(cat => (
        <Link to={cat.to} key={cat.id} className={styles.card}>
          <div className={styles.imageWrap} style={{ backgroundColor: cat.bg }}>
            <img src={cat.image} alt={cat.label} className={styles.image} />
          </div>
          <p className={styles.catName}>{cat.label}</p>
          <p className={styles.catCount}>{cat.count} models</p>
        </Link>
      ))}
    </div>
  </section>
);
